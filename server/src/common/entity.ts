import {
  DeepPartial,
  PrimaryGeneratedColumn,
} from "typeorm";

/**
 * Use for hidden all unnecessary column abstract when select all
 */
export abstract class AbstractEntity {
  protected constructor(input?: DeepPartial<AbstractEntity>) {
    if (input) {
      for (const [key, value] of Object.entries(input)) {
        (this as any)[key] = value;
      }
    }
  }

  @PrimaryGeneratedColumn()
  id: number;
}
