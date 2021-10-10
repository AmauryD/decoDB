import { DenoDB } from "../../deps.ts";
import {
  ColumnOptions,
  getMetadataStorage,
  RelationshipOptions,
} from "../metadata/storage.ts";

export function PrimaryColumn(
  options: string | ColumnOptions,
) {
  return function (target: DenoDB.Model, property: string) {
    options = typeof options === "string"
      ? {
        type: options,
      }
      : options;

    getMetadataStorage()._columns.push({
      target,
      property,
      options: { ...options, primaryKey: true },
    });
  };
}

export function BelongsTo<T extends typeof DenoDB.Model>(
  relationTarget: () => T,
  inverseKey: keyof T,
  options?: RelationshipOptions,
) {
  return function (target: typeof DenoDB.Model, property: string) {
    getMetadataStorage()._relations.push({
      target,
      relationTarget,
      property,
      inverseKey: inverseKey as string,
      options,
      type: "belongs-to",
    });
  };
}

export function ManyToMany<T extends typeof DenoDB.Model>(
  relationTarget: () => T,
  inverseKey: keyof T,
  options?: RelationshipOptions,
) {
  return function (target: typeof DenoDB.Model, property: string) {
    getMetadataStorage()._relations.push({
      target,
      relationTarget,
      property,
      options,
      inverseKey: inverseKey as string,
      type: "many-to-many",
    });
  };
}

export function OneToOne<T extends typeof DenoDB.Model>(
  relationTarget: () => T,
  inverseKey: keyof T,
  options?: RelationshipOptions,
) {
  return function (target: typeof DenoDB.Model, property: string) {
    getMetadataStorage()._relations.push({
      target,
      relationTarget,
      property,
      options,
      inverseKey: inverseKey as string,
      type: "one-to-one",
    });
  };
}

export default function Column(
  options: string | ColumnOptions,
) {
  return function (target: DenoDB.Model, property: string) {
    options = typeof options === "string"
      ? {
        type: options,
      }
      : options;

    getMetadataStorage()._columns.push({
      target,
      property,
      options,
    });
  };
}
