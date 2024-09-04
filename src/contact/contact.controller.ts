import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('/create')
  contactRegistration(@Body() contactDto: ContactDto) {
    return this.contactService.createContactRegistration(contactDto);
  }

  @Get()
  findAll() {
    return this.contactService.findAll();
  }


}
