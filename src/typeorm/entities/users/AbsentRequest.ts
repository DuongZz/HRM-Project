import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from './User';
import { ABSENT_REQUEST, IIsAccepted } from '@/enum/requestEnums';

@Entity('absent-request')
export class AbsentRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  main_point: string;

  @Column()
  date_of_absence: Date;

  @Column()
  reason: string;

  @CreateDateColumn()
  request_date: Date;

  @Column({ type: 'enum', enum: ABSENT_REQUEST, default: ABSENT_REQUEST.PENDING })
  is_accepted: IIsAccepted;

  @Column({ type: 'date', default: null, nullable: true })
  approved_date: Date;

  @Column({ nullable: true })
  approved_by: string;

  @ManyToOne(() => User, (user) => user.requests)
  @JoinColumn()
  user: User;
}
