import { structureColors, structures } from "./enums";
import { DEFAULT_PARTS, type Part } from "./part";
import type { Tile } from "./tile";

export class Board {
  parts!: Part[];
  tiles!: Tile[][];

  constructor() {
    this.createParts();
    this.mapTilesToParts();
    this.placeStructures();
  }

  createParts() {
    const parts = structuredClone(DEFAULT_PARTS);

    for (let i = parts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [parts[i], parts[j]] = [parts[j], parts[i]];
    }

    for (let i = 0; i < parts.length; i++) {
      if (Math.random() > 0.5) {
        parts[i].reverse();
        for (const tiles of parts[i]) {
          tiles.reverse();
        }
      }
    }

    this.parts = parts;
  }

  mapTilesToParts() {
    const tiles: Tile[][] = [];
    for (let i = 0; i < this.parts.length; i++) {
      const part = this.parts[i];
      for (let q = 0; q < part.length; q++) {
        const col = part[q];
        let offsetQ = 0;
        // shift col by six
        if (i >= this.parts.length / 2) {
          offsetQ = 6;
        }

        if (!tiles[q + offsetQ]) {
          tiles[q + offsetQ] = [];
        }

        for (let r = 0; r < col.length; r++) {
          const offsetR = (i % 3) * 3;

          tiles[q + offsetQ][r + offsetR] = part[q][r];
        }
      }
    }

    this.tiles = tiles;
  }

  placeStructures() {
    for (const structure of structures) {
      for (const color of structureColors) {
        while (true) {
          const q = Math.floor(Math.random() * this.tiles.length);
          const r = Math.floor(Math.random() * this.tiles[q].length);
          if (this.tiles[q][r].structure) {
            continue;
          }

          this.tiles[q][r].structure = {
            type: structure,
            color,
          };
          break;
        }
      }
    }
  }
}
