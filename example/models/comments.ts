import { DenoDB } from "../../deps.ts";
import { BelongsTo, Column, Entity, PrimaryColumn } from "../../mod.ts";
import { Article } from "./article.ts";

@Entity({
  name: "comments",
})
export class Comment extends DenoDB.Model {
  // ...
  @PrimaryColumn(DenoDB.DataTypes.INTEGER)
  declare public id: number;

  @Column({
    type: DenoDB.DataTypes.STRING,
  })
  declare public content: string;

  @BelongsTo(() => Article, "comments")
  declare public static article: () => Promise<Article>;
}
