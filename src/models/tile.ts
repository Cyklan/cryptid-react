import type { Structure, StructureColor, Terrain, Territory } from "./enums";

export type Tile = {
  terrain: Terrain;
  structure?: {
    type: Structure;
    color: StructureColor;
  };
  territory?: Territory;
};
