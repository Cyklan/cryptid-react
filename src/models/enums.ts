export const terrains = [
  "Desert",
  "Swamp",
  "Forest",
  "Mountain",
  "River",
] as const;
export type Terrain = (typeof terrains)[number];
export const structures = ["Hut", "Menhir"] as const;
export type Structure = (typeof structures)[number];
export const structureColors = ["Green", "White", "Blue", "Black"] as const;
export type StructureColor = (typeof structureColors)[number];
export const territories = ["Puma", "Bear"] as const;
export type Territory = (typeof territories)[number];
