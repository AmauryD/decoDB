import { DenoDB } from "../../deps.ts";
import { getMetadataStorage } from "../../mod.ts";

export function buildEntities(
  entities: (typeof DenoDB.Model)[],
) {
  const metadata = getMetadataStorage();

  for (const entityModel of entities) {
    const entityMeta = metadata._entities.find((e) => e.target === entityModel);
    if (!entityMeta) {
      throw new Error(
        `No metadata found for ${entityModel}, please decorate with @Entity()`,
      );
    }
    const columns = metadata._columns.filter((e) =>
      e.target.constructor === entityModel
    );

    const fields: Record<string, string> = {};

    for (const column of columns) {
      fields[column.property] = column.dataType;
    }

    Object.defineProperty(entityModel, "fields", {
      value: fields,
    });
  }
}
