import { DenoDB } from "../../deps.ts";
import { Column, Entity } from "../../mod.ts";

@Entity("article")
export class Article extends DenoDB.Model {
  // ...

  @Column(DenoDB.DataTypes.STRING)
  declare public name: string;
}
