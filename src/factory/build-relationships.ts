import { DenoDB } from "../../deps.ts";
import { getMetadataStorage } from "../../mod.ts";

export function buildRelationships(
  entities: (typeof DenoDB.Model)[],
) {
  const metadata = getMetadataStorage();

  for (const entityModel of entities) {
    const entityMeta = metadata._entities.find((e) => e.target === entityModel);

    if (!entityMeta) {
      throw new Error(
        `No metadata found for ${entityModel}, please decorate with @Entity()`,
      );
    }

    const relationships = metadata._relations.filter((e) =>
      e.target === entityModel
    ) ?? [];

    for (
      const { type, relationTarget, property, target, inverseKey }
        of relationships
    ) {
      const relTarget = relationTarget();
      let relFunction: Function | undefined;
      let inverseRelFunction: Function | undefined;

      if (type === "belongs-to") {
        DenoDB.Relationships.belongsTo(entityModel, relTarget);
        relFunction = function (this: typeof entityModel) {
          return this.hasOne(relTarget);
        };
        inverseRelFunction = function (this: typeof relTarget) {
          return this.hasMany(entityModel);
        };
      } else if (type === "many-to-many") {
        DenoDB.Relationships.manyToMany(entityModel, relTarget);
        relFunction = function (this: typeof entityModel) {
          return this.hasMany(relTarget);
        };
        inverseRelFunction = function (this: typeof relTarget) {
          return this.hasMany(entityModel);
        };
      } else if (type === "one-to-one") {
        DenoDB.Relationships.oneToOne(entityModel, relTarget);
        relFunction = function (this: typeof entityModel) {
          return this.hasOne(relTarget);
        };
        inverseRelFunction = function (this: typeof relTarget) {
          return this.hasOne(entityModel);
        };
      }

      if (relFunction && inverseRelFunction) {
        if (!Object.hasOwn(relTarget, inverseKey)) {
          Object.defineProperty(relTarget, inverseKey, {
            value: inverseRelFunction,
          });
        }
        if (!Object.hasOwn(entityModel, property)) {
          Object.defineProperty(entityModel, property, {
            value: relFunction,
          });
        }
      }
    }
  }
}
