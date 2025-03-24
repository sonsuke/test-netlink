import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeepPartial,
  Index,
} from "typeorm";
import { AbstractEntity } from "../common/entity";

@Entity()
export class User extends AbstractEntity {
  constructor(input?: DeepPartial<User>) {
    super(input);
  }

  @Column("text")
  firstName: string;

  @Column("text")
  lastName: string;

  @Index({ unique: true })
  @Column("text")
  email: string;

  @Column("text")
  phoneNo: string;

  @Column("boolean")
  isActive: boolean;
}
