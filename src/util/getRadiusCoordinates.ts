export type HexCoordinate = {
  q: number;
  r: number;
};

export function getRadiusCoordinates(center: HexCoordinate, radius = 1) {
  const coordinates = [];

  for (let dq = -radius; dq <= radius; dq++) {
    const minDr = Math.max(-radius, -dq - radius);
    const maxDr = Math.min(radius, -dq + radius);

    for (let dr = minDr; dr <= maxDr; dr++) {
      const coordinate = { q: center.q + dq, r: center.r + dr };
      coordinates.push(coordinate);
    }
  }

  return coordinates;
}
