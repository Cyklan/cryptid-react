import type { Tile } from "./tile";

export type Part = Tile[][];

export const DEFAULT_PARTS: Part[] = [
  [
    [{ terrain: "River" }, { terrain: "Swamp" }, { terrain: "Swamp" }],
    [{ terrain: "River" }, { terrain: "Swamp" }, { terrain: "Swamp" }],
    [{ terrain: "River" }, { terrain: "River" }, { terrain: "Desert" }],
    [
      { terrain: "River" },
      { terrain: "Desert" },
      { terrain: "Desert", territory: "Bear" },
    ],
    [
      { terrain: "Forest" },
      { terrain: "Forest" },
      { terrain: "Desert", territory: "Bear" },
    ],
    [
      { terrain: "Forest" },
      { terrain: "Forest" },
      { terrain: "Forest", territory: "Bear" },
    ],
  ],
  [
    [
      { terrain: "Swamp", territory: "Puma" },
      { terrain: "Swamp" },
      { terrain: "Swamp" },
    ],
    [
      { terrain: "Forest", territory: "Puma" },
      { terrain: "Swamp" },
      { terrain: "Mountain" },
    ],
    [
      { terrain: "Forest", territory: "Puma" },
      { terrain: "Forest" },
      { terrain: "Mountain" },
    ],
    [{ terrain: "Forest" }, { terrain: "Desert" }, { terrain: "Mountain" }],
    [{ terrain: "Forest" }, { terrain: "Desert" }, { terrain: "Mountain" }],
    [{ terrain: "Forest" }, { terrain: "Desert" }, { terrain: "Desert" }],
  ],
  [
    [
      { terrain: "Swamp" },
      { terrain: "Swamp", territory: "Puma" },
      { terrain: "Mountain", territory: "Puma" },
    ],
    [
      { terrain: "Swamp" },
      { terrain: "Swamp", territory: "Puma" },
      { terrain: "Mountain" },
    ],
    [{ terrain: "Forest" }, { terrain: "Forest" }, { terrain: "Mountain" }],
    [{ terrain: "Forest" }, { terrain: "Mountain" }, { terrain: "Mountain" }],
    [{ terrain: "Forest" }, { terrain: "River" }, { terrain: "River" }],
    [{ terrain: "River" }, { terrain: "River" }, { terrain: "River" }],
  ],
  [
    [{ terrain: "Desert" }, { terrain: "Desert" }, { terrain: "Desert" }],
    [{ terrain: "Desert" }, { terrain: "Desert" }, { terrain: "Desert" }],
    [{ terrain: "Mountain" }, { terrain: "Mountain" }, { terrain: "Desert" }],
    [{ terrain: "Mountain" }, { terrain: "River" }, { terrain: "Forest" }],
    [{ terrain: "Mountain" }, { terrain: "River" }, { terrain: "Forest" }],
    [
      { terrain: "Mountain" },
      { terrain: "River", territory: "Puma" },
      { terrain: "Forest", territory: "Puma" },
    ],
  ],
  [
    [{ terrain: "Swamp" }, { terrain: "Swamp" }, { terrain: "Desert" }],
    [{ terrain: "Swamp" }, { terrain: "Desert" }, { terrain: "Desert" }],
    [{ terrain: "Swamp" }, { terrain: "Desert" }, { terrain: "River" }],
    [{ terrain: "Mountain" }, { terrain: "River" }, { terrain: "River" }],
    [
      { terrain: "Mountain" },
      { terrain: "Mountain" },
      { terrain: "River", territory: "Bear" },
    ],
    [
      { terrain: "Mountain" },
      { terrain: "Mountain", territory: "Bear" },
      { terrain: "River", territory: "Bear" },
    ],
  ],
  [
    [
      { terrain: "Desert", territory: "Bear" },
      { terrain: "Mountain", territory: "Bear" },
      { terrain: "Mountain" },
    ],
    [{ terrain: "Desert" }, { terrain: "Mountain" }, { terrain: "River" }],
    [{ terrain: "Swamp" }, { terrain: "Swamp" }, { terrain: "River" }],
    [{ terrain: "Swamp" }, { terrain: "Swamp" }, { terrain: "River" }],
    [{ terrain: "Swamp" }, { terrain: "Forest" }, { terrain: "River" }],
    [{ terrain: "Forest" }, { terrain: "Forest" }, { terrain: "Forest" }],
  ],
];
