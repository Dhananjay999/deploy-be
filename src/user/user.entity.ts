import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class user {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  FIRSTNAME: string;

  @Column()
  LASTNAME: string;

  @Column()
  EMAIL: string;

  @Column()
  PASSWORD: string;

  @Column({ type: 'bigint' })
  NUMBER: number;
}
