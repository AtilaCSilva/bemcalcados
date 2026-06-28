/** Tabela de conversão pé (cm) → numeração BR feminina */
const WOMENS_SIZE_CHART: { maxCm: number; size: number }[] = [
  { maxCm: 21.6, size: 33 },
  { maxCm: 22.2, size: 34 },
  { maxCm: 22.9, size: 35 },
  { maxCm: 23.6, size: 36 },
  { maxCm: 24.2, size: 37 },
  { maxCm: 24.9, size: 38 },
  { maxCm: 25.6, size: 39 },
  { maxCm: 26.2, size: 40 },
  { maxCm: 26.9, size: 41 },
  { maxCm: Infinity, size: 42 },
]

const MIN_FOOT_CM = 20
const MAX_FOOT_CM = 28

export function getSuggestedShoeSize(footLengthCm: number): number | null {
  if (footLengthCm < MIN_FOOT_CM || footLengthCm > MAX_FOOT_CM) {
    return null
  }

  const match = WOMENS_SIZE_CHART.find((entry) => footLengthCm <= entry.maxCm)
  return match?.size ?? 42
}

export function getFootLengthRangeHint(): string {
  return `Informe uma medida entre ${MIN_FOOT_CM} e ${MAX_FOOT_CM} cm.`
}
