export class GridBitmask {
  private grid: bigint;
  private rows: number;
  private cols: number;

  constructor(rows: number, cols: number, grid?: bigint) {
    if (rows * cols > 2048) {
      throw new Error("Grid too large for reasonable bit manipulation.");
    }
    this.rows = rows;
    this.cols = cols;
    this.grid = grid ?? 0n; // Initialize all bits to 0 (off)
  }

  private getBitIndex(row: number, col: number, logIt?: boolean): number {
    const idx = row * this.cols + col;
    if (logIt) {
      console.log(row, col, idx);
    }

    return idx;
  }

  setCell(row: number, col: number, value: boolean): void {
    const bitIndex = this.getBitIndex(row, col);
    if (bitIndex < 0 || bitIndex >= this.rows * this.cols) {
      throw new Error("index out of range");
    }

    if (value) {
      this.grid |= 1n << BigInt(bitIndex); // Set the bit to 1 (on)
    } else {
      this.grid &= ~(1n << BigInt(bitIndex)); // Set the bit to 0 (off)
    }
  }

  getCell(row: number, col: number, logIt?: boolean): boolean {
    const bitIndex = this.getBitIndex(row, col, logIt);
    if (bitIndex < 0 || bitIndex >= this.rows * this.cols) {
      throw new Error("index out of range");
    }
    return (this.grid & (1n << BigInt(bitIndex))) !== 0n;
  }

  toString(): string {
    let result = "";
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        result += this.getCell(row, col) ? "1" : "0";
      }
      result += "\n";
    }
    return result;
  }

  getBigInt(): bigint {
    return this.grid;
  }
}
