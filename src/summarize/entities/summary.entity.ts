import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { SummarizeStatus } from '../summarize.type';

@Entity()
export class SummaryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: SummarizeStatus, default: SummarizeStatus.NEW })
  status: SummarizeStatus;

  // @Column({ generated: 'uuid', type: 'uuid' })
  // document: string;

  @Column({ nullable: true, type: 'text' })
  result?: string;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
