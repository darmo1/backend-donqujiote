import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('contact')
export class Contact {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
    nullable: true
  })
  email: string;


  @Column('text', {
    nullable: true
  })
  countryId: string;

  @Column('int',{
    default: 1
  })
  numberRegistration: number

  @Column('bigint', {
    unique: true,
    nullable: true
  })
  cellPhone: number;

  @Column('text', {
    nullable: true
  })
  countryName: string;

  @CreateDateColumn() 
  createdAt: Date;

  @UpdateDateColumn()  
  updatedAt: Date;

}
