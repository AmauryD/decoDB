import { DenoDB } from "../../deps.ts";
import { Column, Entity, PrimaryColumn } from "../../mod.ts";
import { Comment } from "./comments.ts";

@Entity({
  name: "articles",
  timestamps: true,
})
export class Article extends DenoDB.Model {
  // ...
  @PrimaryColumn(DenoDB.DataTypes.INTEGER)
  declare public id: number;

  @Column({
    type: DenoDB.DataTypes.STRING,
    default: "bonjour",
  })
  declare public name: string;

  declare public static comments: () => Promise<Comment[]>;
}
