import { DenoDB } from "../../deps.ts";
import { ColumnOptions, getMetadataStorage } from "../metadata/storage.ts";

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

export function BelongsTo(
  relationTarget: () => any,
  inverseKey: any,
) {
  return function (target: typeof DenoDB.Model, property: string) {
    getMetadataStorage()._relations.push({
      target,
      relationTarget,
      property,
      inverseKey,
      type: "belongs-to",
    });
  };
}

export function ManyToMany(
  relationTarget: () => any,
  inverseKey: any,
) {
  return function (target: typeof DenoDB.Model, property: string) {
    getMetadataStorage()._relations.push({
      target,
      relationTarget,
      property,
      inverseKey,
      type: "many-to-many",
    });
  };
}

export function OneToOne(
  relationTarget: () => any,
  inverseKey: any,
) {
  return function (target: typeof DenoDB.Model, property: string) {
    getMetadataStorage()._relations.push({
      target,
      relationTarget,
      property,
      inverseKey,
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
