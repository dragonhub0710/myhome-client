export type Pack = {
size: number;
price: number;
};

export function findOptimalPackCombination(packs: Pack[], requiredQty: number) {
  const MAX = 1000;
  const dp = Array(MAX).fill(Infinity);
  const packCombo: number[][] = Array(MAX).fill(null).map(() => []);

  dp[0] = 0;

  for (let i = 0; i < MAX; i++) {
    for (let j = 0; j < packs.length; j++) {
      const { size, price } = packs[j];
      if (i + size < MAX && dp[i] + price < dp[i + size]) {
        dp[i + size] = dp[i] + price;
        packCombo[i + size] = [...packCombo[i], j];
      }
    }
  }

  let minCost = Infinity;
  let bestIndex = -1;
  for (let i = requiredQty; i < MAX; i++) {
    if (dp[i] < minCost) {
      minCost = dp[i];
      bestIndex = i;
    }
  }

  if (bestIndex === -1) return { total: 0, breakdown: [] };

  const resultPacks = new Map<number, number>();
  for (const index of packCombo[bestIndex]) {
    const packSize = packs[index].size;
    resultPacks.set(packSize, (resultPacks.get(packSize) || 0) + 1);
  }

  const breakdown = Array.from(resultPacks.entries()).map(([size, count]) => ({
    size,
    count,
  }));

  return { total: minCost, breakdown };
}
