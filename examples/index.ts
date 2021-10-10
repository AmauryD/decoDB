import { DenoDB } from "../deps.ts";
import { setupDatabase } from "../mod.ts";
import { Article } from "./models/article.ts";
import { Comment } from "./models/comments.ts";

(async () => {
  const connector = new DenoDB.MySQLConnector({
    database: "nfw",
    host: "localhost",
    username: "root",
    password: "test123*",
    port: 3306, // optional
  });
  const db = new DenoDB.Database(connector);

  await setupDatabase(db, {
    models: [Article, Comment],
  });

  await db.sync({ drop: true });

  console.log(await Article.select().all());
  console.log(await Article.where("id", "1").comments());
})();
