import { DenoDB } from "../deps.ts";
import { buildEntities } from "./factory/build-entities.ts";
import { buildRelationships } from "./factory/build-relationships.ts";

interface CreateOptions {
  models: (typeof DenoDB.Model)[];
}

export async function CreateConnection(
  connector: DenoDB.Connector,
  options: CreateOptions,
) {
  const db = new DenoDB.Database(connector);
  console.log(db);
  buildEntities(options.models);
  await db.link(options.models);
  buildRelationships(options.models);
  return db;
}
