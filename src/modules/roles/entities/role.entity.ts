import { User } from '@modules/users/entities';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @PrimaryColumn({ generated: 'uuid' })
  public id: string;

  @Column()
  public name: string;

  @Column('simple-array')
  public permissions: string[];

  @CreateDateColumn({ nullable: true })
  public readonly createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  public readonly updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  public readonly deletedAt: Date;

  @OneToMany(() => User, ({ role }) => role)
  public readonly users: User[];
}
