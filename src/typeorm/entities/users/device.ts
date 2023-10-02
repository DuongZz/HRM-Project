import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { DEVICE_STATUS } from './types';
import { User } from './User';
// import { DeviceUser } from './deviceUser';
@Entity('Device')
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name_device: string;

  @Column({
    enum: DEVICE_STATUS,
    default: DEVICE_STATUS.AVAILABLE,
  })
  device_status: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  quantity: number;

  @ManyToOne(() => User)
  user: User;
}
