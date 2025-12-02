import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import { chromium, type Browser, type Page } from 'playwright'
import { join } from 'node:path'
import { readFileSync } from 'node:fs'

/**
 * 使用 Playwright 检测页面颜色和 CSS 元素的示例测试
 * 
 * 安装依赖：
 * pnpm add -D playwright @playwright/test
 * pnpm exec playwright install chromium
 */
describe('astro-example e2e tests', () => {
  let browser: Browser
  let page: Page
  const exampleDir = join(process.cwd(), 'examples', 'astro-example')

  beforeAll(async () => {
    browser = await chromium.launch()
  })

  afterAll(async () => {
    await browser.close()
  })

  it('should detect CSS styles and colors', async () => {
    // 启动开发服务器或使用构建后的文件
    // 这里假设你已经构建了项目，或者可以启动 dev server
    const indexPath = `file://${join(exampleDir, 'dist', 'index.html')}`
    
    // 或者使用本地服务器
    // const server = await startServer(exampleDir)
    // const url = `http://localhost:${server.port}`
    
    page = await browser.newPage()
    
    // 访问页面
    // await page.goto(url)
    // 或者使用本地文件
    // await page.goto(indexPath)
    
    // 示例：读取 HTML 文件并注入到页面中（用于测试）
    // 实际使用时，你应该启动开发服务器或使用构建后的文件
    const htmlContent = readFileSync(join(exampleDir, 'dist', 'index.html'), 'utf-8')
    await page.setContent(htmlContent)
    
    // 等待页面加载
    await page.waitForLoadState('networkidle')
    
    // 1. 检测元素的背景颜色
    const cardElement = page.locator('[class*="card"]').first()
    const backgroundColor = await cardElement.evaluate((el) => {
      const styles = window.getComputedStyle(el)
      return styles.backgroundColor
    })
    
    // 验证背景颜色（RGB 格式，例如 "rgb(0, 123, 255)"）
    expect(backgroundColor).toBeTruthy()
    // 可以验证具体的颜色值
    // expect(backgroundColor).toMatch(/rgb\(.*\)/)
    
    // 2. 检测元素的 CSS 属性
    const display = await cardElement.evaluate((el) => {
      return window.getComputedStyle(el).display
    })
    expect(display).toBe('flex')
    
    const borderRadius = await cardElement.evaluate((el) => {
      return window.getComputedStyle(el).borderRadius
    })
    expect(borderRadius).toBeTruthy()
    
    // 3. 检测文本颜色
    const textColor = await cardElement.evaluate((el) => {
      return window.getComputedStyle(el).color
    })
    expect(textColor).toBeTruthy()
    
    // 4. 检测元素的尺寸
    const boundingBox = await cardElement.boundingBox()
    expect(boundingBox).toBeTruthy()
    expect(boundingBox?.width).toBeGreaterThan(0)
    expect(boundingBox?.height).toBeGreaterThan(0)
    
    // 5. 使用 Playwright 的内置方法获取样式
    const padding = await cardElement.evaluate((el) => {
      return window.getComputedStyle(el).padding
    })
    expect(padding).toBeTruthy()
  })

  it('should detect specific color values', async () => {
    page = await browser.newPage()
    
    // 创建一个测试页面来演示颜色检测
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
    
    // 获取背景颜色（返回 RGB 格式）
    const bgColor = await box.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor
    })
    expect(bgColor).toBe('rgb(255, 0, 0)')
    
    // 获取文本颜色（返回 RGB 格式，即使 CSS 中使用的是 hex）
    const textColor = await box.evaluate((el) => {
      return window.getComputedStyle(el).color
    })
    expect(textColor).toBe('rgb(0, 255, 0)')
    
    // 辅助函数：将 RGB 转换为 hex
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
    
    // 获取计算后的样式值（CSS 变量会被解析）
    const bgColor = await element.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor
    })
    expect(bgColor).toBeTruthy()
    
    // 获取 CSS 变量的值
    const cssVar = await element.evaluate((el) => {
      return getComputedStyle(el).getPropertyValue('--primary-color')
    })
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
    const bgColor = await element.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor
    })
    
    // 解析 RGB 值
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
    
    // 验证颜色值（允许一定误差）
    if (color) {
      expect(color.r).toBe(100)
      expect(color.g).toBe(150)
      expect(color.b).toBe(200)
      
      // 或者使用容差比较
      const expectedColor = { r: 100, g: 150, b: 200 }
      const tolerance = 5
      expect(Math.abs(color.r - expectedColor.r)).toBeLessThanOrEqual(tolerance)
      expect(Math.abs(color.g - expectedColor.g)).toBeLessThanOrEqual(tolerance)
      expect(Math.abs(color.b - expectedColor.b)).toBeLessThanOrEqual(tolerance)
    }
  })
})

