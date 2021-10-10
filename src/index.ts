import { DenoDB } from "../deps.ts";
import { buildEntities } from "./factory/build-entities.ts";
import { buildRelationships } from "./factory/build-relationships.ts";

interface CreateOptions {
  models: (typeof DenoDB.Model)[];
}

export async function setupDatabase(
  db: DenoDB.Database,
  options: CreateOptions,
) {
  buildEntities(options.models);
  await db.link(options.models);
  buildRelationships(options.models);
  return db;
}
