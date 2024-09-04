import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRegistration: Repository<Contact>,
  ) {}

  async createContactRegistration(contactRegistration: ContactDto) {
    try {
      let existingContact = await this.contactRegistration.findOne({
        where: [
          { email: contactRegistration.email },
          { cellPhone: contactRegistration.cellPhone }
        ]
      });
      if (existingContact) {
        // Si el contacto existe, actualiza y aumenta el número de registro en 1
        existingContact.numberRegistration += 1;
        existingContact = this.contactRegistration.merge(existingContact, contactRegistration);
        await this.contactRegistration.save(existingContact);
        return {
          ok: true,
          message: 'Contacto actualizado y número de registro incrementado.'
        };
      }

      const registerContact = await this.contactRegistration.create(contactRegistration);
      const response = await this.contactRegistration.save(registerContact);
      return {
        ok: true,
      };
    } catch (error) {
      // this.handleDBErrors(error)
      console.log({ error })
      return {
        ok: false,
      };
    }
  }

  findAll() {
    return `This action returns all contact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  // private handleDBErrors(error: any): never {
  //   if (error.code == '23505') throw new BadRequestException(error.detail);
  //   console.log(error);
  //   throw new InternalServerErrorException('Please check server errors');
  // }

}
