import { DenoDB } from "../../deps.ts";
import { getMetadataStorage } from "../../mod.ts";
import { EntityOptions } from "../metadata/storage.ts";

/**
 * Comment
 *
 * @returns {ClassDecorator}
 */
export default function Entity(options: string | EntityOptions) {
  return function (
    target: typeof DenoDB.Model,
  ): void {
    options = typeof options === "string" ? { name: options } : options;

    getMetadataStorage()._entities.push({
      target,
      options,
    });
  };
}
