import { IsBoolean, IsString, IsUUID } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false //esto significa que no lo muestre cuando se busca un user
  })
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', {
    default: true
  })
  isActive: boolean;

  @Column('text', { 
    array: true,
    default: ['user']
  })
  roles: string[];

  @BeforeInsert()
  checkFieldsBeforeInsert(){
    this.email = this.email.toLocaleLowerCase().trim()
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate(){
    this.checkFieldsBeforeInsert();
  }
}
