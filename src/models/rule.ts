import {
  structureColors,
  structures,
  terrains,
  territories,
  type Structure,
  type StructureColor,
  type Terrain,
  type Territory,
} from "./enums";

import { createId } from "@paralleldrive/cuid2";

export type Rule = {
  negated: boolean;
  id: string;
};

export type TwoTerrainsRule = Rule & {
  type: "twoTerrains";
  terrains: [Terrain, Terrain];
};

export type RangeOneTerrainRule = Rule & {
  type: "rangeOneTerrain";
  terrain: Terrain;
};

export type RangeOneTerritoryRule = Rule & {
  type: "rangeOneTerritory";
};

export type RangeTwoTerritoryRule = Rule & {
  type: "rangeTwoTerritory";
  territory: Territory;
};

export type RangeTwoStructureRule = Rule & {
  type: "rangeTwoStructure";
  structure: Structure;
};

export type RangeThreeStructureRule = Rule & {
  type: "rangeThreeStructure";
  color: StructureColor;
};

export type GameRule =
  | TwoTerrainsRule
  | RangeOneTerrainRule
  | RangeOneTerritoryRule
  | RangeTwoTerritoryRule
  | RangeTwoStructureRule
  | RangeThreeStructureRule;

export type RuleType = GameRule["type"];

export function generateAllRules(): GameRule[] {
  return [
    ...generateTwoTerrainsRules(),
    ...generateRangeOneTerrainRules(),
    ...generateRangeOneTerritoryRules(),
    ...generateRangeTwoStructureRules(),
    ...generateRangeTwoTerritoryRules(),
    ...generateRangeThreeStructureRules(),
  ];
}

export function generateTwoTerrainsRules() {
  const terrainCombos: [Terrain, Terrain][] = [];
  for (let i = 0; i < terrains.length; i++) {
    for (let j = i; j < terrains.length; j++) {
      if (i === j) {
        continue;
      }
      terrainCombos.push([terrains[i], terrains[j]]);
    }
  }

  const rules: TwoTerrainsRule[] = terrainCombos.map((terrains) => ({
    negated: false,
    terrains,
    type: "twoTerrains",
    id: createId(),
  }));

  const _rules = rules.map((rule) => ({
    ...rule,
    id: createId(),
    negated: true,
  }));

  return [...rules, ..._rules];
}

export function generateRangeOneTerrainRules() {
  const rules: RangeOneTerrainRule[] = [];
  for (let i = 0; i < terrains.length; i++) {
    rules.push({
      negated: false,
      terrain: terrains[i],
      type: "rangeOneTerrain",
      id: createId(),
    });

    rules.push({
      negated: true,
      terrain: terrains[i],
      type: "rangeOneTerrain",
      id: createId(),
    });
  }

  return rules;
}

export function generateRangeOneTerritoryRules(): RangeOneTerritoryRule[] {
  return [
    {
      negated: true,
      type: "rangeOneTerritory",
      id: createId(),
    },
    {
      negated: false,
      type: "rangeOneTerritory",
      id: createId(),
    },
  ];
}

export function generateRangeTwoTerritoryRules(): RangeTwoTerritoryRule[] {
  const rules: RangeTwoTerritoryRule[] = [];
  for (const territory of territories) {
    rules.push({
      negated: true,
      territory,
      type: "rangeTwoTerritory",
      id: createId(),
    });

    rules.push({
      negated: false,
      territory,
      type: "rangeTwoTerritory",
      id: createId(),
    });
  }

  return rules;
}

export function generateRangeTwoStructureRules() {
  const rules: RangeTwoStructureRule[] = [];

  for (const structure of structures) {
    rules.push({
      negated: true,
      structure,
      type: "rangeTwoStructure",
      id: createId(),
    });

    rules.push({
      negated: false,
      structure,
      type: "rangeTwoStructure",
      id: createId(),
    });
  }

  return rules;
}

export function generateRangeThreeStructureRules() {
  const rules: RangeThreeStructureRule[] = [];

  for (const color of structureColors) {
    rules.push({
      type: "rangeThreeStructure",
      color,
      negated: true,
      id: createId(),
    });

    rules.push({
      type: "rangeThreeStructure",
      color,
      negated: false,
      id: createId(),
    });
  }

  return rules;
}
