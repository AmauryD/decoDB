# DecoDB [![Lint](https://github.com/AmauryD/decoDB/actions/workflows/lint.yml/badge.svg)](https://github.com/AmauryD/decoDB/actions/workflows/lint.yml) [![Tests](https://github.com/AmauryD/decoDB/actions/workflows/tests.yml/badge.svg)](https://github.com/AmauryD/decoDB/actions/workflows/tests.yml)

[DenoDB](https://github.com/eveningkid/denodb) with decorators.

## Installing

TODO

## TODO before first release

- [x] Attributes decorators
- [x] Relationships decorators
- [ ] Tests
- [ ] Documentation

## Quick start

### Defining models

```ts
@Entity("articles")
export class Article extends DenoDB.Model {
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
@Entity("comments")
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
(async() => {
  const connector = new DenoDB.MySQLConnector({
    ...
  });
  const db = new DenoDB.Database(connector);

  await setupDatabase(db, {
    models: [Article, Comment, User],
  });
  ...
})();
```
