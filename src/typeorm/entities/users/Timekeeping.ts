import { DailyCheckInInfo } from '@/types/DailyCheckInInfo';
import { Column, Entity, PrimaryColumn, getRepository } from 'typeorm';

@Entity('timekeeping')
export class Timekeeping {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @PrimaryColumn()
  month: number;
  @PrimaryColumn()
  year: number;
  @Column({ type: 'json' })
  monthlyCheckInInfo: DailyCheckInInfo[];
}
