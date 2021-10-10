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
