import { DenoDB } from "../../deps.ts";
import { assertEquals } from "../../dev_deps.ts";
import { getMetadataStorage, setupDatabase } from "../../mod.ts";
import { Article } from "../samples/articles.ts";

Deno.test("Testing sample", async () => {
  const connector = new DenoDB.SQLite3Connector({
    filepath: ":memory:",
  });
  const db = new DenoDB.Database(connector);

  await setupDatabase(db, {
    models: [Article],
  });

  await connector.close();
  await db.close();

  const metadata = getMetadataStorage();

  assertEquals(metadata.entities.length, 1);
  assertEquals(metadata.entities[0].target, Article);
});
