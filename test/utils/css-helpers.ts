import type { Locator } from 'playwright'

export function parseRgb(rgb: string): { r: number; g: number; b: number } | null {
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  if (!match) return null
  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
  }
}

export function rgbToHex(rgb: string): string {
  const color = parseRgb(rgb)
  if (!color) return rgb

  const r = color.r.toString(16).padStart(2, '0')
  const g = color.g.toString(16).padStart(2, '0')
  const b = color.b.toString(16).padStart(2, '0')
  return `#${r}${g}${b}`
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) return null

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

export function colorsMatch(
  color1: { r: number; g: number; b: number } | string,
  color2: { r: number; g: number; b: number } | string,
  tolerance = 0,
): boolean {
  const c1 = typeof color1 === 'string' ? parseRgb(color1) : color1
  const c2 = typeof color2 === 'string' ? parseRgb(color2) : color2

  if (!c1 || !c2) return false

  return Math.abs(c1.r - c2.r) <= tolerance && Math.abs(c1.g - c2.g) <= tolerance && Math.abs(c1.b - c2.b) <= tolerance
}

export async function getComputedStyle(locator: Locator, property: string): Promise<string> {
  return locator.evaluate((el, prop) => window.getComputedStyle(el).getPropertyValue(prop), property)
}

export async function getBackgroundColor(locator: Locator): Promise<string> {
  return locator.evaluate((el) => window.getComputedStyle(el).backgroundColor)
}

export async function getTextColor(locator: Locator): Promise<string> {
  return locator.evaluate((el) => window.getComputedStyle(el).color)
}

export async function getBorderColor(
  locator: Locator,
  side: 'top' | 'right' | 'bottom' | 'left' = 'top',
): Promise<string> {
  return locator.evaluate((el, s) => window.getComputedStyle(el).getPropertyValue(`border-${s}-color`), side)
}

export async function getComputedStyles(locator: Locator, properties: string[]): Promise<Record<string, string>> {
  return locator.evaluate((el, props) => {
    const styles = window.getComputedStyle(el)
    const result: Record<string, string> = {}
    for (const prop of props) {
      result[prop] = styles.getPropertyValue(prop) || (styles as any)[prop]
    }
    return result
  }, properties)
}

export async function verifyStyle(
  locator: Locator,
  property: string,
  expectedValue: string | RegExp,
): Promise<boolean> {
  const actualValue = await getComputedStyle(locator, property)

  if (expectedValue instanceof RegExp) {
    return expectedValue.test(actualValue)
  }

  return actualValue.trim() === expectedValue.trim()
}

export async function verifyColor(
  locator: Locator,
  colorType: 'background' | 'color' | 'border' = 'background',
  expectedColor: { r: number; g: number; b: number } | string,
  tolerance = 0,
): Promise<boolean> {
  let actualColor: string

  switch (colorType) {
    case 'background':
      actualColor = await getBackgroundColor(locator)
      break
    case 'color':
      actualColor = await getTextColor(locator)
      break
    case 'border':
      actualColor = await getBorderColor(locator)
      break
  }

  let expectedRgb: { r: number; g: number; b: number } | null = null

  if (typeof expectedColor === 'string') {
    if (expectedColor.startsWith('#')) {
      expectedRgb = hexToRgb(expectedColor)
    } else if (expectedColor.startsWith('rgb')) {
      expectedRgb = parseRgb(expectedColor)
    }
  } else {
    expectedRgb = expectedColor
  }

  if (!expectedRgb) return false

  return colorsMatch(actualColor, expectedRgb, tolerance)
}
