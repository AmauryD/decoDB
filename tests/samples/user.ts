import { DenoDB } from "../../deps.ts";
import { Entity, PrimaryColumn } from "../../mod.ts";
import { Article } from "./articles.ts";

@Entity({
  name: "users",
})
export class User extends DenoDB.Model {
  @PrimaryColumn({ type: DenoDB.DataTypes.INTEGER, autoIncrement: true })
  declare public id: number;

  declare public static articles: () => Promise<Article[]>;
}
