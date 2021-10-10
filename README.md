# DecoDB [![Lint](https://github.com/AmauryD/decoDB/actions/workflows/lint.yml/badge.svg)](https://github.com/AmauryD/decoDB/actions/workflows/lint.yml) [![Tests](https://github.com/AmauryD/decoDB/actions/workflows/tests.yml/badge.svg)](https://github.com/AmauryD/decoDB/actions/workflows/tests.yml)

[DenoDB](https://github.com/eveningkid/denodb) with decorators.

## Installing

TODO

## TODO before first release

- [x] Attributes decorators
- [x] Relationships decorators
- [ ] Tests
- [ ] Documentation

### Creating models

```ts
import { DenoDB } from "../../deps.ts";
import { Column, Entity, PrimaryColumn } from "../../mod.ts";
import { Comment } from "./comments.ts";

@Entity({
  name: "articles",
  timestamps: true,
})
export class Article extends DenoDB.Model {
  // ...
  @PrimaryColumn({ type: DenoDB.DataTypes.INTEGER, autoIncrement: true })
  declare public id: number;

  @Column({
    type: DenoDB.DataTypes.STRING,
    default: "bonjour",
    allowNull: true,
    unique: true,
  })
  declare public name: string;

  declare public static comments: () => Promise<Comment[]>;
}
```

```ts
import { DenoDB } from "../../deps.ts";
import { BelongsTo, Column, Entity, PrimaryColumn } from "../../mod.ts";
import { Article } from "./article.ts";

@Entity({
  name: "comments",
})
export class Comment extends DenoDB.Model {
  @PrimaryColumn(DenoDB.DataTypes.INTEGER)
  declare public id: number;

  @Column({
    type: DenoDB.DataTypes.STRING,
  })
  declare public content: string;

  @BelongsTo(() => Article, "comments")
  declare public static article: () => Promise<Article>;
}
```

### Creating connection

```ts
import { DenoDB } from "../deps.ts";
import { setupDatabase } from "../mod.ts";
import { Article } from "./models/article.ts";
import { Comment } from "./models/comments.ts";

(async () => {
  const connector = new DenoDB.MySQLConnector(
    // ...
  );
  const db = new DenoDB.Database(connector);

  await setupDatabase(db, {
    models: [Article, Comment],
  });

  // sync DB
  await db.sync({ drop: true });
})();
```
