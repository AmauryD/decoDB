# DecoDB

[DenoDB](https://github.com/eveningkid/denodb) with decorators.

## Installing

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
const connector = new DenoDB.MySQLConnector({
  database: "nfw",
  host: "localhost",
  username: "root",
  password: "test123*",
  port: 3306, // optional
});

const db = await CreateConnection(connector, {
  models: [Article, Comment],
});
```
