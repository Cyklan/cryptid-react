import { match } from "ts-pattern";
import type { Board } from "../models/board";
import type {
  GameRule,
  RangeOneTerrainRule,
  RangeThreeStructureRule,
  RangeTwoStructureRule,
  RangeTwoTerritoryRule,
  TwoTerrainsRule,
} from "../models/rule";
import type {
  Structure,
  StructureColor,
  Terrain,
  Territory,
} from "../models/enums";
import { GridBitmask } from "../util/GridBitmask";
import { getRadiusCoordinates } from "../util/getRadiusCoordinates";

export function validate(board: Board, rules: GameRule[]): boolean {
  const ruleBits = rules.map((rule) => findCryptidForRule(board, rule));

  let combinedAnd = ruleBits[0];
  for (let i = 1; i < ruleBits.length; i++) {
    combinedAnd &= ruleBits[i];
  }

  if (combinedAnd === 0n) {
    return false;
  }

  return (combinedAnd & (combinedAnd - 1n)) === 0n;
}

export function findCryptidForRule(board: Board, rule: GameRule): bigint {
  return match(rule.type)
    .with("twoTerrains", () =>
      validateTwoTerrains(
        board,
        (rule as TwoTerrainsRule).terrains,
        rule.negated
      )
    )
    .with("rangeOneTerrain", () =>
      validateRangeOneTerrain(
        board,
        (rule as RangeOneTerrainRule).terrain,
        rule.negated
      )
    )
    .with("rangeOneTerritory", () =>
      validateRangeOneTerritory(board, rule.negated)
    )
    .with("rangeTwoTerritory", () =>
      validateRangeTwoTerritory(
        board,
        (rule as RangeTwoTerritoryRule).territory,
        rule.negated
      )
    )
    .with("rangeTwoStructure", () =>
      validateRangeTwoStructure(
        board,
        (rule as RangeTwoStructureRule).structure,
        rule.negated
      )
    )
    .with("rangeThreeStructure", () =>
      validateRangeThreeStructure(
        board,
        (rule as RangeThreeStructureRule).color,
        rule.negated
      )
    )
    .exhaustive();
}

function validateTwoTerrains(
  board: Board,
  terrains: [Terrain, Terrain],
  negated: boolean
): bigint {
  const bitmask = new GridBitmask(9, 12);

  for (let q = 0; q < board.tiles.length; q++) {
    for (let r = 0; r < board.tiles[q].length; r++) {
      if (terrains.includes(board.tiles[q][r].terrain)) {
        bitmask.setCell(r, q, !negated);
      } else {
        bitmask.setCell(r, q, negated);
      }
    }
  }

  return bitmask.getBigInt();
}

function validateRangeOneTerrain(
  board: Board,
  terrain: Terrain,
  negated: boolean
) {
  const bitmask = new GridBitmask(9, 12);

  for (let q = 0; q < board.tiles.length; q++) {
    for (let r = 0; r < board.tiles[q].length; r++) {
      if (board.tiles[q][r].terrain !== terrain) {
        continue;
      }
      if (!negated) {
        validateBitmaskInRadius(board, bitmask, q, r, 1);
      }
    }
  }

  return bitmask.getBigInt();
}

function validateRangeOneTerritory(board: Board, negated: boolean) {
  const bitmask = new GridBitmask(9, 12);
  for (let q = 0; q < board.tiles.length; q++) {
    for (let r = 0; r < board.tiles[q].length; r++) {
      if (!board.tiles[q][r].territory) {
        continue;
      }

      if (!negated) {
        validateBitmaskInRadius(board, bitmask, q, r, 1);
      } else {
        validateBitmaskAllButRadius(board, bitmask, q, r, 1);
      }
    }
  }

  return bitmask.getBigInt();
}

function validateRangeTwoTerritory(
  board: Board,
  territory: Territory,
  negated: boolean
) {
  const bitmask = new GridBitmask(9, 12);
  for (let q = 0; q < board.tiles.length; q++) {
    for (let r = 0; r < board.tiles[q].length; r++) {
      if (board.tiles[q][r].territory !== territory) {
        continue;
      }

      if (!negated) {
        validateBitmaskInRadius(board, bitmask, q, r, 2);
      } else {
        validateBitmaskAllButRadius(board, bitmask, q, r, 2);
      }
    }
  }
  return bitmask.getBigInt();
}

function validateRangeTwoStructure(
  board: Board,
  structure: Structure,
  negated: boolean
) {
  const bitmask = new GridBitmask(9, 12);
  for (let q = 0; q < board.tiles.length; q++) {
    for (let r = 0; r < board.tiles[q].length; r++) {
      if (board.tiles[q][r].structure?.type !== structure) {
        continue;
      }

      if (!negated) {
        validateBitmaskInRadius(board, bitmask, q, r, 2);
      } else {
        validateBitmaskAllButRadius(board, bitmask, q, r, 2);
      }
    }
  }

  return bitmask.getBigInt();
}

function validateRangeThreeStructure(
  board: Board,
  color: StructureColor,
  negated: boolean
) {
  const bitmask = new GridBitmask(9, 12);
  for (let q = 0; q < board.tiles.length; q++) {
    for (let r = 0; r < board.tiles[q].length; r++) {
      if (board.tiles[q][r].structure?.color !== color) {
        continue;
      }

      if (!negated) {
        validateBitmaskInRadius(board, bitmask, q, r, 3);
      } else {
        validateBitmaskAllButRadius(board, bitmask, q, r, 3);
      }
    }
  }
  return bitmask.getBigInt();
}

function validateBitmaskAllButRadius(
  board: Board,
  bitmask: GridBitmask,
  q: number,
  r: number,
  radius = 1
) {
  const neighbours = getRadiusCoordinates({ q, r }, radius);
  for (let q = 0; q < board.tiles.length; q++) {
    for (let r = 0; r < board.tiles[q].length; r++) {
      if (neighbours.find((n) => n.q === q && n.r === r)) {
        bitmask.setCell(r, q, false);
      } else {
        bitmask.setCell(r, q, true);
      }
    }
  }
}

function validateBitmaskInRadius(
  board: Board,
  bitmask: GridBitmask,
  q: number,
  r: number,
  radius = 1
) {
  const neighbours = getRadiusCoordinates({ q, r }, radius);
  for (const neighbour of neighbours) {
    if (board.tiles.at(neighbour.q)?.at(neighbour.r)) {
      bitmask.setCell(r, q, true);
    }
  }
}
