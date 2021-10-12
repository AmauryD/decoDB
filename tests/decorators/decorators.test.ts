import { DenoDB } from "../../deps.ts";
import {
  assertArrayIncludes,
  assertEquals,
  assertObjectMatch,
} from "../../dev_deps.ts";
import { getMetadataStorage } from "../../mod.ts";

Deno.test("Test decorators and metadata storage", async () => {
  // simulate loading Models
  const { Article } = await import("../samples/articles.ts");
  // deno-lint-ignore no-unused-vars
  const { User } = await import("../samples/user.ts");

  const metadatastore = getMetadataStorage();

  assertEquals(metadatastore.entities.length, 2);

  assertArrayIncludes(metadatastore.columns.map((e) => e.property), [
    "name",
    "id",
  ]);

  const nameMetadata = metadatastore.columns.find((e) =>
    e.property === "name"
  )!;
  const idMetadata = metadatastore.columns.find((e) => e.property === "id")!;
  const articlesRelationMetadata = metadatastore.relations.find((e) =>
    e.property === "author" && e.target === Article
  )!;

  assertEquals(articlesRelationMetadata.property, "author");
  assertEquals(articlesRelationMetadata.type, "belongs-to");
  assertEquals(articlesRelationMetadata.inverseKey, "articles");

  assertObjectMatch(nameMetadata.options, {
    type: DenoDB.DataTypes.STRING,
    default: "bonjour",
    allowNull: true,
    unique: true,
  });
  assertObjectMatch(idMetadata.options, {
    type: DenoDB.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  });
});
