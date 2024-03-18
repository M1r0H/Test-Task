import { User } from '@modules/users/entities';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tokens' })
export class Token<Payload = unknown> extends BaseEntity {
  @PrimaryColumn({ generated: 'uuid' })
  public readonly id: string;

  @Column()
  public readonly token: string;

  @Column()
  public readonly type: string;

  @Column()
  public readonly userId: string;

  @Column()
  public readonly expiry: Date;

  @Column({ nullable: true, type: 'simple-json' })
  public readonly payload?: Payload;

  @CreateDateColumn({ nullable: true })
  public readonly createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  public readonly updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  public readonly deletedAt: Date;

  @ManyToOne(() => User, ({ tokens }) => tokens)
  @JoinColumn({ name: 'userId' })
  public readonly user: User;
}
