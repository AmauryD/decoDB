import { DenoDB } from "../../deps.ts";
import { assertEquals, assertExists } from "../../dev_deps.ts";
import { setupDatabase } from "../../mod.ts";
import { Article } from "../samples/articles.ts";
import { User } from "../samples/user.ts";

Deno.test("Testing sample", async () => {
  const connector = new DenoDB.SQLite3Connector({
    filepath: ":memory:",
  });
  const db = new DenoDB.Database(connector);

  await setupDatabase(db, {
    models: [Article, User],
  });
  await db.sync();

  assertEquals(
    typeof Article.author,
    "function",
    "Inverse relation should (still) exists",
  );
  assertEquals(typeof User.articles, "function", "Inverse relation is created");

  const user = new User();
  await user.save();

  const newArticle = new Article();
  newArticle.name = "My article";
  newArticle.userId = 1;
  await newArticle.save();

  // entity should be inserted
  const fetched = await Article.where("id", "1").first() as Article;
  assertExists(fetched, "Inserted record should exists");
  assertEquals(fetched.name, "My article");
  assertEquals(fetched.id, 1);

  const author = await Article.where("id", "1").author();
  assertExists(author, "Author should be fetched");
  assertEquals(typeof author, "object");

  const articles = await User.where("id", 1).articles();
  assertEquals(Array.isArray(articles), true, "Articles should be an array");
  assertEquals(articles.length, 1, "Should have one element");

  await connector.close();
  await db.close();
});
