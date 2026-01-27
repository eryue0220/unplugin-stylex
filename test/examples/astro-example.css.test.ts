import { type Browser, chromium, type Page } from 'playwright'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import {
  getBackgroundColor,
  getComputedStyle,
  getTextColor,
  parseRgb,
  rgbToHex,
  verifyColor,
  verifyStyle,
} from '../utils/css-helpers'

describe('astro-example CSS detection', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await chromium.launch()
  })

  afterAll(async () => {
    await browser.close()
  })

  beforeEach(async () => {
    page = await browser.newPage()
  })

  afterEach(async () => {
    await page.close()
  })

  it('should detect background color', async () => {
    await page.setContent(`
      <html>
        <body>
          <div class="card" style="background-color: rgb(0, 123, 255); padding: 16px;">
            Test Card
          </div>
        </body>
      </html>
    `)

    const card = page.locator('.card')
    const bgColor = await getBackgroundColor(card)

    expect(bgColor).toBe('rgb(0, 123, 255)')

    const hexColor = rgbToHex(bgColor)
    expect(hexColor.toLowerCase()).toBe('#007bff')
  })

  it('should detect text color', async () => {
    await page.setContent(`
      <html>
        <body>
          <div class="text" style="color: #ff0000;">
            Red Text
          </div>
        </body>
      </html>
    `)

    const textElement = page.locator('.text')
    const textColor = await getTextColor(textElement)

    expect(textColor).toBe('rgb(255, 0, 0)')
  })

  it('should verify color with tolerance', async () => {
    await page.setContent(`
      <html>
        <body>
          <div class="box" style="background-color: rgb(100, 150, 200);">
            Box
          </div>
        </body>
      </html>
    `)

    const box = page.locator('.box')

    const matches = await verifyColor(box, 'background', { r: 100, g: 150, b: 200 }, 5)
    expect(matches).toBe(true)

    const matchesHex = await verifyColor(box, 'background', '#6496c8', 5)
    expect(matchesHex).toBe(true)
  })

  it('should detect CSS properties', async () => {
    await page.setContent(`
      <html>
        <head>
          <style>
            .flex-container {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 20px;
              border-radius: 8px;
            }
          </style>
        </head>
        <body>
          <div class="flex-container">Content</div>
        </body>
      </html>
    `)

    const container = page.locator('.flex-container')

    const display = await getComputedStyle(container, 'display')
    expect(display).toBe('flex')

    const padding = await getComputedStyle(container, 'padding')
    expect(padding).toBe('20px')

    const borderRadius = await getComputedStyle(container, 'border-radius')
    expect(borderRadius).toBe('8px')

    const isFlex = await verifyStyle(container, 'display', 'flex')
    expect(isFlex).toBe(true)
  })

  it('should detect CSS custom properties', async () => {
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

    const primaryColor = await getComputedStyle(element, '--primary-color')
    expect(primaryColor.trim()).toBe('#3498db')

    const bgColor = await getBackgroundColor(element)
    expect(bgColor).toBe('rgb(52, 152, 219)')
  })

  it('should parse and compare RGB colors', async () => {
    await page.setContent(`
      <html>
        <body>
          <div style="background-color: rgb(255, 128, 64);">Test</div>
        </body>
      </html>
    `)

    const div = page.locator('div')
    const bgColor = await getBackgroundColor(div)

    const rgb = parseRgb(bgColor)
    expect(rgb).toEqual({ r: 255, g: 128, b: 64 })

    const hex = rgbToHex(bgColor)
    expect(hex.toLowerCase()).toBe('#ff8040')
  })

  it('should detect multiple style properties at once', async () => {
    await page.setContent(`
      <html>
        <head>
          <style>
            .card {
              display: flex;
              background-color: #ff6b6b;
              color: #ffffff;
              padding: 20px;
              border-radius: 12px;
              width: 300px;
              height: 200px;
            }
          </style>
        </head>
        <body>
          <div class="card">Card Content</div>
        </body>
      </html>
    `)

    const card = page.locator('.card')

    expect(await getComputedStyle(card, 'display')).toBe('flex')
    expect(await getComputedStyle(card, 'padding')).toBe('20px')
    expect(await getComputedStyle(card, 'border-radius')).toBe('12px')
    expect(await getComputedStyle(card, 'width')).toBe('300px')
    expect(await getComputedStyle(card, 'height')).toBe('200px')

    const bgColor = await getBackgroundColor(card)
    expect(bgColor).toBe('rgb(255, 107, 107)')

    const textColor = await getTextColor(card)
    expect(textColor).toBe('rgb(255, 255, 255)')
  })
})
