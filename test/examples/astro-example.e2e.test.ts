import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { type Browser, chromium, type Page } from 'playwright'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('astro-example e2e tests', () => {
  let browser: Browser
  let page: Page
  const exampleDir = join(process.cwd(), 'examples', 'astro-example')

  beforeAll(async () => {
    browser = await chromium.launch({
      headless: true,
    })
  })

  afterAll(async () => {
    if (browser) {
      await browser.close()
    }
  })

  it('should detect CSS styles and colors', async () => {
    page = await browser.newPage()

    const htmlContent = readFileSync(join(exampleDir, 'dist', 'index.html'), 'utf-8')
    await page.setContent(htmlContent)

    await page.waitForLoadState('networkidle')

    const cardElement = page.locator('[class*="card"]').first()
    const backgroundColor = await cardElement.evaluate((el) => {
      const styles = window.getComputedStyle(el)
      return styles.backgroundColor
    })
    expect(backgroundColor).toBeTruthy()

    const display = await cardElement.evaluate((el) => window.getComputedStyle(el).display)

    expect(display).toBe('flex')

    const borderRadius = await cardElement.evaluate((el) => window.getComputedStyle(el).borderRadius)
    expect(borderRadius).toBeTruthy()

    const textColor = await cardElement.evaluate((el) => window.getComputedStyle(el).color)
    expect(textColor).toBeTruthy()

    const boundingBox = await cardElement.boundingBox()
    expect(boundingBox).toBeTruthy()
    expect(boundingBox?.width).toBeGreaterThan(0)
    expect(boundingBox?.height).toBeGreaterThan(0)

    const padding = await cardElement.evaluate((el) => window.getComputedStyle(el).padding)
    expect(padding).toBeTruthy()
  })

  it('should detect specific color values', async () => {
    page = await browser.newPage()

    await page.setContent(`
      <html>
        <head>
          <style>
            .test-box {
              background-color: rgb(255, 0, 0);
              color: #00ff00;
              width: 100px;
              height: 100px;
            }
          </style>
        </head>
        <body>
          <div class="test-box">Test</div>
        </body>
      </html>
    `)

    const box = page.locator('.test-box')
    const bgColor = await box.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    expect(bgColor).toBe('rgb(255, 0, 0)')

    const textColor = await box.evaluate((el) => window.getComputedStyle(el).color)
    expect(textColor).toBe('rgb(0, 255, 0)')

    const rgbToHex = (rgb: string) => {
      const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
      if (!match) return rgb
      const r = parseInt(match[1], 10).toString(16).padStart(2, '0')
      const g = parseInt(match[2], 10).toString(16).padStart(2, '0')
      const b = parseInt(match[3], 10).toString(16).padStart(2, '0')
      return `#${r}${g}${b}`
    }
    const bgColorHex = rgbToHex(bgColor)
    expect(bgColorHex.toLowerCase()).toBe('#ff0000')
  })

  it('should detect CSS custom properties (CSS variables)', async () => {
    page = await browser.newPage()

    await page.setContent(`
      <html>
        <head>
          <style>
            :root {
              --primary-color: #3498db;
              --spacing: 16px;
            }
            .element {
              background-color: var(--primary-color);
              padding: var(--spacing);
            }
          </style>
        </head>
        <body>
          <div class="element">Test</div>
        </body>
      </html>
    `)

    const element = page.locator('.element')
    const bgColor = await element.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    expect(bgColor).toBeTruthy()

    const cssVar = await element.evaluate((el) => getComputedStyle(el).getPropertyValue('--primary-color'))
    expect(cssVar.trim()).toBe('#3498db')
  })

  it('should compare colors with tolerance', async () => {
    page = await browser.newPage()

    await page.setContent(`
      <html>
        <body>
          <div style="background-color: rgb(100, 150, 200)">Test</div>
        </body>
      </html>
    `)

    const element = page.locator('div')
    const bgColor = await element.evaluate((el) => window.getComputedStyle(el).backgroundColor)

    const parseRgb = (rgb: string) => {
      const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
      if (!match) return null
      return {
        r: parseInt(match[1], 10),
        g: parseInt(match[2], 10),
        b: parseInt(match[3], 10),
      }
    }

    const color = parseRgb(bgColor)
    expect(color).toBeTruthy()

    if (color) {
      expect(color.r).toBe(100)
      expect(color.g).toBe(150)
      expect(color.b).toBe(200)

      const expectedColor = { r: 100, g: 150, b: 200 }
      const tolerance = 5
      expect(Math.abs(color.r - expectedColor.r)).toBeLessThanOrEqual(tolerance)
      expect(Math.abs(color.g - expectedColor.g)).toBeLessThanOrEqual(tolerance)
      expect(Math.abs(color.b - expectedColor.b)).toBeLessThanOrEqual(tolerance)
    }
  })
})
