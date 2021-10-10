import { DenoDB } from "../../deps.ts";
import { getMetadataStorage } from "../metadata/storage.ts";

export default function Column(
  dataType: string,
) {
  return function (target: DenoDB.Model, property: string) {
    getMetadataStorage()._columns.push({
      target,
      property,
      dataType,
    });
  };
}
