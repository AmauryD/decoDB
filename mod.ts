import Entity from "./src/decorators/entity.ts";
import Column, {
  BelongsTo,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
} from "./src/decorators/column.ts";
import { setupDatabase } from "./src/index.ts";
import { getMetadataStorage } from "./src/metadata/storage.ts";

export {
  BelongsTo,
  Column,
  Entity,
  getMetadataStorage,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
  setupDatabase,
};
