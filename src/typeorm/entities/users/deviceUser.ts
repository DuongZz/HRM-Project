import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, Column } from 'typeorm';
import { User } from './User';
import { Device } from './device';

@Entity()
export class DeviceUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Device)
  device: Device;
}
