import { DenoDB } from "../../deps.ts";

export interface EntitiesMetadata {
  target: typeof DenoDB.Model;
  name: string;
}

export interface ColumnsMetadata {
  target: DenoDB.Model;
  property: string;
  dataType: string;
}

export interface RelationsMetadata {
  target: typeof DenoDB.Model;
  property: string;
  relationTarget: () => typeof DenoDB.Model;
}

export class MetadataStorage {
  public static instance: MetadataStorage;

  public _entities: EntitiesMetadata[] = [];
  public _columns: ColumnsMetadata[] = [];
  public _relations: RelationsMetadata[] = [];
}

export function getMetadataStorage() {
  if (MetadataStorage.instance) {
    return MetadataStorage.instance;
  }
  return MetadataStorage.instance = new MetadataStorage();
}
