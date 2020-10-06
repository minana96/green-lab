// @flow

// Usage: [...rules].sort(sortRules);
export default function sortRules<E: { timestamp: number }, T: { event: E }>(a: T, b: T): number {
  return b.event.timestamp - a.event.timestamp;
}
