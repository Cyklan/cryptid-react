export function removeAtIndex<T>(arr: T[], index: number): T[] {
  if (index < 0 || index >= arr.length) {
    return arr; // Return the original array if the index is out of bounds.
  }

  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
