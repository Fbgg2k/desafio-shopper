import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Reading } from './Reading';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  customer_code!: string;

  @Column()
  name!: string;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => Reading, reading => reading.customer)
  readings!: Reading[];
}
