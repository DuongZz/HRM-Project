// import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, Column } from 'typeorm';
// import { User } from './User';
// import { Device } from './device';

// @Entity()
// export class DeviceUser {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => User)
//   @JoinColumn({ name: 'user_id' })
//   user: User;

//   @ManyToOne(() => Device)
//   @JoinColumn({ name: 'device_id' })
//   device: Device;
// }
