import { UserStatusType } from '@modules/users/users.constants';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '@modules/roles/entities';
import { Token } from '@modules/tokens/entities';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryColumn({ generated: 'uuid' })
  public readonly id: string;

  @Column({ nullable: true })
  public firstName: string;

  @Column({ nullable: true })
  public lastName: string;

  @Column()
  public email: string;

  @Column({ select: false })
  public password: string;

  @Column()
  public roleId: string;

  @Column()
  public status: UserStatusType;

  @CreateDateColumn()
  public readonly createdAt: Date;

  @UpdateDateColumn()
  public readonly updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  public readonly deletedAt: Date;

  @ManyToOne(() => Role, ({ users }) => users)
  @JoinColumn({ name: 'roleId' })
  public role?: Role;

  @OneToMany(() => Token, ({ user }) => user, { cascade: ['remove'] })
  public tokens: Token[];
}
