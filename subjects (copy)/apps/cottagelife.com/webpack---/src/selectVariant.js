// @flow
export default function selectVariant<V: { weight: number }>(randomSeed: number, variants: V[]): V {
  if (typeof randomSeed !== 'number' || randomSeed < 0 || randomSeed >= 1) {
    throw new Error(`Invalid random seed: ${randomSeed}`);
  }

  const randomWeight = variants.reduce((total, variant) => {
    if (typeof variant.weight !== 'number' || variant.weight < 0) {
      throw new Error(`Invalid variant weight: ${variant.weight}`);
    }
    return total + variant.weight;
  }, 0) * randomSeed;

  let weightSum = 0;

  for (let i = 0; i < variants.length; i++) {
    weightSum += variants[i].weight;

    if (randomWeight < weightSum) {
      return variants[i];
    }
  }

  // This default case should never be reached but it's necessary to appease eslint and flow
  return variants[0];
}
