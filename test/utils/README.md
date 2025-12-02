# CSS 和颜色检测测试工具

这个目录包含了用于检测页面颜色和 CSS 元素的测试辅助工具。

## 安装

```bash
# 安装 Playwright
pnpm add -D playwright

# 安装浏览器（只需要运行一次）
pnpm exec playwright install chromium
```

## 使用方法

### 基本用法

```typescript
import { chromium } from 'playwright'
import { getBackgroundColor, getTextColor, verifyColor } from '../utils/css-helpers'

test('检测背景颜色', async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  
  await page.setContent('<div style="background-color: rgb(255, 0, 0);">Test</div>')
  const element = page.locator('div')
  
  // 获取背景颜色
  const bgColor = await getBackgroundColor(element)
  expect(bgColor).toBe('rgb(255, 0, 0)')
  
  await browser.close()
})
```

### 可用的辅助函数

#### 颜色检测

- `getBackgroundColor(locator)` - 获取元素的背景颜色
- `getTextColor(locator)` - 获取元素的文本颜色
- `getBorderColor(locator, side?)` - 获取元素的边框颜色
- `verifyColor(locator, type, expectedColor, tolerance?)` - 验证颜色（支持容差）

#### CSS 属性检测

- `getComputedStyle(locator, property)` - 获取元素的 CSS 属性值
- `getComputedStyles(locator, properties)` - 批量获取多个 CSS 属性
- `verifyStyle(locator, property, expectedValue)` - 验证 CSS 属性值

#### 颜色转换工具

- `parseRgb(rgb)` - 解析 RGB 字符串为对象
- `rgbToHex(rgb)` - 将 RGB 转换为 hex 格式
- `hexToRgb(hex)` - 将 hex 转换为 RGB 对象
- `colorsMatch(color1, color2, tolerance?)` - 比较两个颜色是否相似

## 示例

查看 `test/examples/astro-example.css.test.ts` 获取完整示例。

