import { DenoDB } from "../../deps.ts";
import { getMetadataStorage } from "../../mod.ts";

export function buildEntities(
  entities: (typeof DenoDB.Model)[],
) {
  const metadata = getMetadataStorage();

  for (const entityModel of entities) {
    const entityMeta = metadata.entities.find((e) => e.target === entityModel);

    if (!entityMeta) {
      throw new Error(
        `No metadata found for ${entityModel}, please decorate with @Entity()`,
      );
    }

    const columns = metadata.columns.filter((e) =>
      e.target.constructor === entityModel
    );

    const fields: Record<string, unknown> = {};
    const defaults: Record<string, unknown> = {};

    for (const { property, options } of columns) {
      const defaultColumnValue = options.default;
      // delete default, not assignable to fields
      delete options.default;
      fields[property] = options;
      if (options.default) {
        defaults[property] = defaultColumnValue;
      }
    }

    Object.defineProperty(entityModel, "table", {
      value: entityMeta.options.name,
    });
    Object.defineProperty(entityModel, "timestamps", {
      value: entityMeta.options.timestamps ?? false,
    });
    Object.defineProperty(entityModel, "defaults", {
      value: defaults,
    });
    Object.defineProperty(entityModel, "fields", {
      value: fields,
    });
  }
}
