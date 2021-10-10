import { DenoDB } from "../../deps.ts";
import { getMetadataStorage } from "../../mod.ts";

type Constructor<K> = { new (): K };

/**
 * Comment
 *
 * @returns {ClassDecorator}
 */
export default function Entity(name: string) {
  return function (
    target: typeof DenoDB.Model,
  ): void {
    getMetadataStorage()._entities.push({
      target,
      name,
    });
  };
}
