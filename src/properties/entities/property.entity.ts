import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  type: string;

  @Column('text')
  description: string;

  @Column('text', {
    nullable: true,
  })
  address: string;

  @Column('numeric', {
    nullable: true,
  })
  price: number;

  @Column('text', {
    array: true,
  })
  images: string[];

  @Column('bool', {
    default: true,
  })
  available: boolean;

  @Column('text')
  departments: string;

  @Column('text')
  municipality: string;

  @Column('text')
  location: string;

  @Column('numeric', {
    nullable: true,
  })
  area: number;

  @Column('text')
  reference: string;

  @Column('numeric', {
    nullable: true,
  })
  socialClass: number;

  @Column('numeric', {
    nullable: true,
  })
  rooms: number;

  @Column('numeric', {
    nullable: true,
  })
  closet: number;

  @Column('text')
  administration: string;

  @Column('numeric', {
    nullable: true,
  })
  garage: number;

  @Column('numeric', {
    nullable: true,
  })
  kitchen: number;

  @Column('numeric', {
    nullable: true,
  })
  bathroom: number;

  @Column('numeric', {
    nullable: true,
  })
  dinningroom: number;
}
