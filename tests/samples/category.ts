import { DenoDB } from "../../deps.ts";
import { Column, Entity, ManyToMany, PrimaryColumn } from "../../mod.ts";
import { Article } from "./articles.ts";

@Entity("categories")
export class Category extends DenoDB.Model {
  // ...
  @PrimaryColumn({ type: DenoDB.DataTypes.INTEGER, autoIncrement: true })
  declare public id: number;

  @Column({
    type: DenoDB.DataTypes.STRING,
    allowNull: true,
  })
  declare public name: string;

  @ManyToMany(() => Article, "categories")
  declare public static articles: () => Promise<Article>;
}
