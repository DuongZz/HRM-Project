import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { DEVICE_STATUS } from './types';
import { User } from './User';
import { DeviceUser } from './deviceUser';
// import { DeviceUser } from './deviceUser';
@Entity('Device')
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
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

  @OneToMany(() => DeviceUser, (deviceUser) => deviceUser.device)
  deviceUsers: DeviceUser[];
}
