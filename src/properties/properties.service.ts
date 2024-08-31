import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import { FilesService } from 'src/files/files.service';
import { SearchPropertyDto } from './dto/search-property.dto';
import { v4 as uuid  } from 'uuid'

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,

    private readonly fileService: FilesService,
  ) {}

  async create(
    createPropertyDto: CreatePropertyDto,
    images: Array<Express.Multer.File> = [],
  ) {
    try {
      const uploadedImages = await Promise.all(
        images.map(async (img) => {
          const { secure_url } = await this.fileService.uploadImage(img);
          return secure_url;
        }),
      );

      await this.propertyRepository.save({
        ...createPropertyDto,
        images: uploadedImages,
      });
      return {
        ok: true,
      };
    } catch (err) {
      console.error({ err });
      return {
        ok: false,
      };
    }
  }

  async searchProperty(values: SearchPropertyDto): Promise<Property[]> {
    const { city, property, rooms } = values;
    const query = this.propertyRepository.createQueryBuilder('property');
    query.where('LOWER(property.municipality) = LOWER(:city)', { city });

    if (property) {
      query.andWhere('LOWER(property.type) = LOWER(:property)', { property });
    }

    if (rooms) {
      query.andWhere('property.rooms = :rooms', { rooms });
    }
    const results = await query.getMany();
    return results;
  }

  async findMenuProperties(){
    try{
    const municipalities = await this.propertyRepository
    .createQueryBuilder('property')
    .select('DISTINCT(property.municipality)', 'municipality')
    .getRawMany();

    if(municipalities.length === 0){
      return []
    }

    return municipalities.map(item => ({ id: uuid(),  city: item.municipality}));
    
    }catch(error){
      throw new InternalServerErrorException('Error fetching municipalities');
    }
  }

  async findAllProperties() {
    const properties = await this.propertyRepository.findBy({
      available: true,
    });
    return properties;
  }
}
