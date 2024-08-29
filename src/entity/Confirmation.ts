import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Reading } from './Reading';

@Entity()
export class Confirmation {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Reading, reading => reading.confirmations)
  reading!: Reading;

  @CreateDateColumn()
  confirmed_at!: Date;
}
