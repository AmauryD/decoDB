import { DenoDB } from "../../deps.ts";

interface PivotTable {
  modelA: typeof DenoDB.Model;
  modelB: typeof DenoDB.Model;
  modelPivot: typeof DenoDB.Model;
}

/**
 * At the moment it's only purpose is to store pivot models
 */
export class ModelRegistry {
  private static _instance: ModelRegistry;

  /**
   * Singleton pattern
   */
  static get instance() {
    if (ModelRegistry._instance) {
      return ModelRegistry._instance;
    }
    return ModelRegistry._instance = new ModelRegistry();
  }

  /**
   * Get the pivot table between 2 models
   */
  public getPivot(modelA: typeof DenoDB.Model, modelB: typeof DenoDB.Model) {
    return this.pivots.find((e) => e.modelA === modelA && e.modelB === modelB)
      ?.modelPivot;
  }

  /**
   * Add pivot table to the registry
   */
  public addPivot(
    modelA: typeof DenoDB.Model,
    modelB: typeof DenoDB.Model,
    modelPivot: typeof DenoDB.Model,
  ) {
    this.pivots.push({
      modelA,
      modelB,
      modelPivot,
    });
  }

  private pivots: PivotTable[] = [];
}
