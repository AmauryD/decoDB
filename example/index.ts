import { DenoDB } from "../deps.ts";
import { CreateConnection } from "../mod.ts";
import { Article } from "./models/article.ts";

(async () => {
  const connector = new DenoDB.MySQLConnector({
    database: "nfw",
    host: "localhost",
    username: "root",
    password: "test123*",
    port: 3306, // optional
  });

  await CreateConnection(connector, {
    models: [Article],
  });
})();
