const breakpointsRem: Record<string, number> = {
  tiny: 24, // 384px
  small: 50, // 800px
  medium: 64, // 1024px
  large: 75, // 1200px
  huge: 100, // 1600px
}

/// Used from component styles as linearClamp(small, large, 1, 2): interpolates
/// a size between two breakpoints, clamped at both ends.
export const linearClamp = (
  minWidth: string,
  maxWidth: string,
  minSize: string,
  maxSize: string
): string => {
  const minW = breakpointsRem[minWidth] ?? parseFloat(minWidth)
  const maxW = breakpointsRem[maxWidth] ?? parseFloat(maxWidth)
  const minS = parseFloat(minSize)
  const maxS = parseFloat(maxSize)

  const slope = (maxS - minS) / (maxW - minW)
  const yAxisIntersection = -minW * slope + minS
  const preferredValue = `${yAxisIntersection}rem + ${slope * 100}vw`

  return `clamp(${minS}rem, ${preferredValue}, ${maxS}rem)`
}

export default linearClamp
