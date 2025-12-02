import type { Locator } from 'playwright'

/**
 * CSS 和颜色检测辅助工具
 */

/**
 * 解析 RGB 颜色字符串为对象
 * @param rgb - RGB 颜色字符串，例如 "rgb(255, 0, 0)"
 * @returns RGB 颜色对象或 null
 */
export function parseRgb(rgb: string): { r: number; g: number; b: number } | null {
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  if (!match) return null
  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
  }
}

/**
 * 将 RGB 颜色转换为 hex 格式
 * @param rgb - RGB 颜色字符串
 * @returns hex 颜色字符串，例如 "#ff0000"
 */
export function rgbToHex(rgb: string): string {
  const color = parseRgb(rgb)
  if (!color) return rgb
  
  const r = color.r.toString(16).padStart(2, '0')
  const g = color.g.toString(16).padStart(2, '0')
  const b = color.b.toString(16).padStart(2, '0')
  return `#${r}${g}${b}`
}

/**
 * 将 hex 颜色转换为 RGB 对象
 * @param hex - hex 颜色字符串，例如 "#ff0000" 或 "ff0000"
 * @returns RGB 颜色对象或 null
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return null
  
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

/**
 * 比较两个颜色是否相似（允许容差）
 * @param color1 - 第一个颜色（RGB 对象或字符串）
 * @param color2 - 第二个颜色（RGB 对象或字符串）
 * @param tolerance - 容差值，默认 0
 * @returns 是否相似
 */
export function colorsMatch(
  color1: { r: number; g: number; b: number } | string,
  color2: { r: number; g: number; b: number } | string,
  tolerance = 0
): boolean {
  const c1 = typeof color1 === 'string' ? parseRgb(color1) : color1
  const c2 = typeof color2 === 'string' ? parseRgb(color2) : color2
  
  if (!c1 || !c2) return false
  
  return (
    Math.abs(c1.r - c2.r) <= tolerance &&
    Math.abs(c1.g - c2.g) <= tolerance &&
    Math.abs(c1.b - c2.b) <= tolerance
  )
}

/**
 * 获取元素的计算样式属性
 * @param locator - Playwright Locator
 * @param property - CSS 属性名
 * @returns CSS 属性值
 */
export async function getComputedStyle(
  locator: Locator,
  property: string
): Promise<string> {
  return locator.evaluate((el, prop) => {
    return window.getComputedStyle(el).getPropertyValue(prop)
  }, property)
}

/**
 * 获取元素的背景颜色
 * @param locator - Playwright Locator
 * @returns RGB 颜色字符串
 */
export async function getBackgroundColor(locator: Locator): Promise<string> {
  return locator.evaluate((el) => {
    return window.getComputedStyle(el).backgroundColor
  })
}

/**
 * 获取元素的文本颜色
 * @param locator - Playwright Locator
 * @returns RGB 颜色字符串
 */
export async function getTextColor(locator: Locator): Promise<string> {
  return locator.evaluate((el) => {
    return window.getComputedStyle(el).color
  })
}

/**
 * 获取元素的边框颜色
 * @param locator - Playwright Locator
 * @param side - 边框方向：'top' | 'right' | 'bottom' | 'left'，默认为 'top'
 * @returns RGB 颜色字符串
 */
export async function getBorderColor(
  locator: Locator,
  side: 'top' | 'right' | 'bottom' | 'left' = 'top'
): Promise<string> {
  return locator.evaluate((el, s) => {
    return window.getComputedStyle(el).getPropertyValue(`border-${s}-color`)
  }, side)
}

/**
 * 获取元素的所有 CSS 属性
 * @param locator - Playwright Locator
 * @param properties - 要获取的属性数组
 * @returns 属性键值对对象
 */
export async function getComputedStyles(
  locator: Locator,
  properties: string[]
): Promise<Record<string, string>> {
  return locator.evaluate((el, props) => {
    const styles = window.getComputedStyle(el)
    const result: Record<string, string> = {}
    for (const prop of props) {
      result[prop] = styles.getPropertyValue(prop) || (styles as any)[prop]
    }
    return result
  }, properties)
}

/**
 * 验证元素的 CSS 属性值
 * @param locator - Playwright Locator
 * @param property - CSS 属性名
 * @param expectedValue - 期望的值（可以是字符串或正则表达式）
 * @returns 是否匹配
 */
export async function verifyStyle(
  locator: Locator,
  property: string,
  expectedValue: string | RegExp
): Promise<boolean> {
  const actualValue = await getComputedStyle(locator, property)
  
  if (expectedValue instanceof RegExp) {
    return expectedValue.test(actualValue)
  }
  
  return actualValue.trim() === expectedValue.trim()
}

/**
 * 验证元素的颜色（支持容差）
 * @param locator - Playwright Locator
 * @param colorType - 颜色类型：'background' | 'color' | 'border'
 * @param expectedColor - 期望的颜色（RGB 对象、RGB 字符串或 hex 字符串）
 * @param tolerance - 容差值，默认 0
 * @returns 是否匹配
 */
export async function verifyColor(
  locator: Locator,
  colorType: 'background' | 'color' | 'border' = 'background',
  expectedColor: { r: number; g: number; b: number } | string,
  tolerance = 0
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
  
  // 将期望的颜色转换为 RGB 对象
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

