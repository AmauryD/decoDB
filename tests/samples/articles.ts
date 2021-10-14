import { DenoDB } from "../../deps.ts";
import { BelongsTo, Column, Entity, PrimaryColumn } from "../../mod.ts";
import { Category } from "./category.ts";
import { User } from "./user.ts";

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

  declare public userId: number;

  declare public static categories: () => Promise<Category>[];

  @BelongsTo(() => User, "articles")
  declare public static author: () => Promise<User>;
}
