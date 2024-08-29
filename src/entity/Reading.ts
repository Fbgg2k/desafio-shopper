import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Customer } from './Customer';
import { Confirmation } from './Confirmation';

@Entity()
export class Reading {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Customer, customer => customer.readings)
  customer!: Customer;

  @Column()
  measure_type!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value!: number;

  @Column()
  reading_date!: Date;

  @Column({ default: false })
  confirmed!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => Confirmation, confirmation => confirmation.reading)
  confirmations!: Confirmation[];
}
