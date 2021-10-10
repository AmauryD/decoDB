import { DenoDB } from "../../deps.ts";
import { assertArrayIncludes, assertObjectMatch } from "../../dev_deps.ts";
import { getMetadataStorage } from "../../mod.ts";

Deno.test("Column decorator", async () => {
  await import("../samples/articles.ts");
  const metadatastore = getMetadataStorage();
  assertArrayIncludes(metadatastore.columns.map((e) => e.property), [
    "name",
    "id",
  ]);

  const name = metadatastore.columns.find((e) => e.property === "name")!;
  const id = metadatastore.columns.find((e) => e.property === "id")!;

  assertObjectMatch(name?.options, {
    type: DenoDB.DataTypes.STRING,
    default: "bonjour",
    allowNull: true,
    unique: true,
  });
  assertObjectMatch(id?.options, {
    type: DenoDB.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  });
});
