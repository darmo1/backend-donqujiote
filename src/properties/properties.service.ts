import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { DataSource, EntityMetadata, Repository } from 'typeorm';
import { FilesService } from 'src/files/files.service';
import { SearchPropertyDto } from './dto/search-property.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    private readonly fileService: FilesService,
    private readonly dataSource: DataSource,
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
  
    query.where('UNACCENT(LOWER(property.municipality)) = UNACCENT(LOWER(:city))', { city });
  
    if (property) {
      query.andWhere('UNACCENT(LOWER(property.type)) = UNACCENT(LOWER(:property))', { property });
    }
  
    if (rooms) {
      query.andWhere('property.rooms = :rooms', { rooms });
    }
  
    const results = await query.getMany();
    return results;
  }

  async findMenuProperties() {
    try {
      const municipalities = await this.propertyRepository
        .createQueryBuilder('property')
        .select('DISTINCT(property.municipality)', 'municipality')
        .getRawMany();

      if (municipalities.length === 0) {
        return [];
      }

      return municipalities.map((item) => ({
        id: uuid(),
        city: item.municipality,
      }));
    } catch (error) {
      throw new InternalServerErrorException('Error fetching municipalities');
    }
  }

  async findProperties(id: string, city?: string) {
  
    try {
      // let sugesstedProperties = [];
      // if (city) {
      //   const query = this.propertyRepository.createQueryBuilder('property');
      //   query.where('LOWER(property.municipality) = LOWER(:city)', { city });
      //   query.andWhere('property.available = :available', { available: true });
      //   const properties = await query.getMany();
      //   sugesstedProperties = properties.filter((item) => item.id !== id);
      // }

      const query = this.propertyRepository.createQueryBuilder('p');
      query.where('p.available = :available', { available: true });
      query.andWhere('p.id = :id', { id });
      const property = await query.getMany();

      const response = { property };
      return response;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching get Property');
    }
  }

  async findPropertiesSuggestedByCity(suggestedBy: string) {
    try {
      const query = this.propertyRepository.createQueryBuilder('property');

      const suggestedProperties = await query
        .where('LOWER(property.municipality) = LOWER(:suggestedBy)', { suggestedBy })
        .andWhere('property.available = :available', { available: true })
        // .orderBy('property.createdAt', 'DESC') // Opcional: ordenar por la fecha de creación
        .limit(5) // Limitar a 5 resultados
        .getMany();
        return {
          suggestedProperties
        }
    } catch (error) {
      console.log({ error })
      throw new InternalServerErrorException('Error fetching get Property');
    }
  }

  async findAllProperties() {
    const properties = await this.propertyRepository.findBy({
      available: true,
    });
    return properties;
  }


  async onModuleInit() {
    // Ejecutar la extensión unaccent en la base de datos si no existe
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS unaccent;');
    } catch (error) {
      console.error('Error creating unaccent extension:', error);
      throw new InternalServerErrorException('Failed to create unaccent extension');
    } finally {
      await queryRunner.release();
    }
  }
}
