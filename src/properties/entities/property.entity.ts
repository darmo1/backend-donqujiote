import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Property {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text',)
  type: string;

  @Column('text')
  description: string

  @Column('text', {
    nullable: false
  })
  address: string;

  @Column('numeric', {
    nullable: true
  })
  price: number
  
  @Column('text', {
    array: true
  })
  images: string[]

  @Column('bool', {
    default: true
  })
  available: boolean
}
