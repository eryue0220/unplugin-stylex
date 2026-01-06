import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import { chromium, type Browser, type Page } from 'playwright'
import {
  getBackgroundColor,
  getTextColor,
  getComputedStyle,
  verifyColor,
  verifyStyle,
  parseRgb,
  rgbToHex,
} from '../utils/css-helpers'

/**
 * 使用 Playwright 检测页面颜色和 CSS 元素的简化示例
 * 
 * 安装依赖：
 * pnpm add -D playwright
 * pnpm exec playwright install chromium
 */
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

    // 验证背景颜色
    expect(bgColor).toBe('rgb(0, 123, 255)')

    // 转换为 hex 格式
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

    // 验证文本颜色（浏览器会将 hex 转换为 rgb）
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

    // 使用容差验证颜色（允许 ±5 的误差）
    const matches = await verifyColor(box, 'background', { r: 100, g: 150, b: 200 }, 5)
    expect(matches).toBe(true)

    // 使用 hex 颜色验证
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

    // 检测 display 属性
    const display = await getComputedStyle(container, 'display')
    expect(display).toBe('flex')

    // 检测 padding
    const padding = await getComputedStyle(container, 'padding')
    expect(padding).toBe('20px')

    // 检测 border-radius
    const borderRadius = await getComputedStyle(container, 'border-radius')
    expect(borderRadius).toBe('8px')

    // 使用 verifyStyle 验证
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

    // 获取 CSS 变量的值
    const primaryColor = await getComputedStyle(element, '--primary-color')
    expect(primaryColor.trim()).toBe('#3498db')

    // 获取计算后的背景颜色（CSS 变量会被解析）
    const bgColor = await getBackgroundColor(element)
    expect(bgColor).toBe('rgb(52, 152, 219)') // #3498db 的 RGB 值
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

    // 解析 RGB
    const rgb = parseRgb(bgColor)
    expect(rgb).toEqual({ r: 255, g: 128, b: 64 })

    // 转换为 hex
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

    // 验证多个样式属性
    expect(await getComputedStyle(card, 'display')).toBe('flex')
    expect(await getComputedStyle(card, 'padding')).toBe('20px')
    expect(await getComputedStyle(card, 'border-radius')).toBe('12px')
    expect(await getComputedStyle(card, 'width')).toBe('300px')
    expect(await getComputedStyle(card, 'height')).toBe('200px')

    // 验证颜色
    const bgColor = await getBackgroundColor(card)
    expect(bgColor).toBe('rgb(255, 107, 107)') // #ff6b6b 的 RGB 值

    const textColor = await getTextColor(card)
    expect(textColor).toBe('rgb(255, 255, 255)') // #ffffff 的 RGB 值
  })
})

