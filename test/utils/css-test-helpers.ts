import { execSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

export interface CSSRule {
  selector: string
  properties: Record<string, string>
}

/**
 * Parse CSS content and extract rules
 * Handles @layer, nested rules, and standard CSS rules
 */
export function parseCSS(css: string): CSSRule[] {
  const rules: CSSRule[] = []

  // Remove comments
  css = css.replace(/\/\*[\s\S]*?\*\//g, '')

  // Remove @layer declarations at the start (like @layer priority1, priority2, ...;)
  css = css.replace(/@layer\s+[^;]+;/g, '')

  // Remove @layer blocks but keep their content
  // Match @layer name { ... } and replace with just the content
  css = css.replace(/@layer\s+[^{]*\{/g, '')

  // Remove other @ rules that don't contain selectors
  css = css.replace(/@[^{;]+;?/g, '')

  // Now parse CSS rules: selector { properties }
  // Match selector { properties } where properties don't contain nested braces
  const ruleRegex = /([^{}\s][^{}]*?)\{([^{}]+)\}/g
  let match

  while ((match = ruleRegex.exec(css)) !== null) {
    const selector = match[1].trim()
    const propertiesText = match[2].trim()

    if (!selector || selector === '}') {
      continue
    }

    const properties: Record<string, string> = {}
    // Match property: value pairs, handling quoted values and URLs
    const propRegex = /([^:;]+):([^;]+);?/g
    let propMatch

    while ((propMatch = propRegex.exec(propertiesText)) !== null) {
      const key = propMatch[1].trim()
      const value = propMatch[2].trim()
      if (key && value) {
        properties[key] = value
      }
    }

    if (selector && Object.keys(properties).length > 0) {
      rules.push({ selector, properties })
    }
  }

  return rules
}

/**
 * Find CSS file in a directory recursively
 */
export function findCSSFile(dir: string, filename = 'stylex.css'): string | null {
  if (!existsSync(dir)) {
    return null
  }

  const items = readdirSync(dir)

  for (const item of items) {
    const fullPath = join(dir, item)
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      const found = findCSSFile(fullPath, filename)
      if (found) return found
    } else if (item === filename || item.endsWith('.css')) {
      return fullPath
    }
  }

  return null
}

/**
 * Build example project and return the dist directory
 */
export function buildExample(exampleDir: string, buildCommand = 'npm run build'): string {
  const distDir = join(exampleDir, 'dist')

  try {
    // Run build command
    execSync(buildCommand, {
      cwd: exampleDir,
      stdio: 'pipe',
      env: { ...process.env, NODE_ENV: 'production' },
    })
  } catch (error) {
    throw new Error(`Failed to build example at ${exampleDir}: ${error}`)
  }

  return distDir
}

/**
 * Extract CSS from JavaScript file
 * CSS in JS files can be:
 * 1. As string literals in quotes
 * 2. As style tag content
 * 3. Direct CSS rules (e.g., .x...{...})
 */
export function extractCSSFromJS(jsContent: string): string {
  let css = ''

  // Extract @layer declarations
  const layerMatches = jsContent.match(/@layer[^;]+;/g)
  if (layerMatches) {
    css += layerMatches.join('\n') + '\n'
  }

  // Extract CSS rules: .x...{...} patterns
  const ruleRegex = /\.x[a-z0-9]+\{[^}]+\}/g
  const ruleMatches = jsContent.match(ruleRegex)
  if (ruleMatches) {
    // Group rules by @layer if they exist, otherwise just concatenate
    if (layerMatches && layerMatches.length > 0) {
      // If we have layers, try to reconstruct the layer structure
      // For now, just collect all rules
      css += ruleMatches.join('\n')
    } else {
      css += ruleMatches.join('\n')
    }
  }

  // Also try to extract CSS from string literals (quoted CSS)
  const stringLiteralRegex = /['"`]([^'"`]*@layer[^'"`]*)['"`]/g
  let stringMatch
  while ((stringMatch = stringLiteralRegex.exec(jsContent)) !== null) {
    const cssInString = stringMatch[1]
    if (cssInString.includes('@layer') || cssInString.includes('.x')) {
      css += '\n' + cssInString
    }
  }

  // Extract from style tag content
  const styleTagRegex = /<style[^>]*>([^<]*)<\/style>/gi
  let styleMatch
  while ((styleMatch = styleTagRegex.exec(jsContent)) !== null) {
    css += '\n' + styleMatch[1]
  }

  return css.trim()
}

/**
 * Find JavaScript file in a directory recursively
 */
export function findJSFile(dir: string, filename?: string): string | null {
  if (!existsSync(dir)) {
    return null
  }

  const items = readdirSync(dir)

  for (const item of items) {
    const fullPath = join(dir, item)
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      const found = findJSFile(fullPath, filename)
      if (found) return found
    } else if (item.endsWith('.js') || item.endsWith('.mjs') || item.endsWith('.cjs')) {
      if (!filename || item === filename) {
        return fullPath
      }
    }
  }

  return null
}

/**
 * Get CSS content from built example
 * Supports both standalone CSS files and CSS embedded in JS files
 */
export function getCSSFromExample(exampleDir: string, target = 'dist', cssFilename = 'stylex.css'): string | null {
  const distDir = join(exampleDir, target)

  if (!existsSync(distDir)) {
    return null
  }

  // First try to find a standalone CSS file
  const cssPath = findCSSFile(distDir, cssFilename)
  if (cssPath) {
    return readFileSync(cssPath, 'utf-8')
  }

  // If no CSS file found, try to extract CSS from JS files
  const jsFile = findJSFile(distDir)
  if (jsFile) {
    const jsContent = readFileSync(jsFile, 'utf-8')
    const extractedCSS = extractCSSFromJS(jsContent)
    if (extractedCSS) {
      return extractedCSS
    }
  }

  return null
}

/**
 * Check if a CSS class exists and has expected properties
 */
export function checkCSSClass(
  css: string,
  className: string,
  expectedProperties: Record<string, string | RegExp>,
): { exists: boolean; matched: Record<string, boolean>; actualProperties?: Record<string, string> } {
  const rules = parseCSS(css)

  // Find rule that matches the class name
  // Class names in stylex are typically like .x1a2b3c4 or similar
  // We'll search for rules that contain the class name or match a pattern
  const matchingRule = rules.find((rule) => {
    // Check if selector contains the class name or matches a pattern
    // Stylex generates class names, so we need to be flexible
    return (
      rule.selector.includes(className) ||
      rule.selector.match(new RegExp(`\\.x[\\w]+.*${className}`)) ||
      className.includes(rule.selector.replace(/^\./, ''))
    )
  })

  if (!matchingRule) {
    // Try to find by checking if any rule has the expected properties
    for (const rule of rules) {
      let matches = 0
      for (const [key, expectedValue] of Object.entries(expectedProperties)) {
        const actualValue = rule.properties[key]
        if (actualValue) {
          if (expectedValue instanceof RegExp) {
            if (expectedValue.test(actualValue)) matches++
          } else if (normalizeCSSValue(actualValue) === normalizeCSSValue(expectedValue)) {
            matches++
          }
        }
      }
      // If most properties match, consider it the right rule
      if (matches >= Object.keys(expectedProperties).length * 0.7) {
        const matched: Record<string, boolean> = {}
        for (const [key, expectedValue] of Object.entries(expectedProperties)) {
          const actualValue = rule.properties[key]
          if (actualValue) {
            if (expectedValue instanceof RegExp) {
              matched[key] = expectedValue.test(actualValue)
            } else {
              matched[key] = normalizeCSSValue(actualValue) === normalizeCSSValue(expectedValue)
            }
          } else {
            matched[key] = false
          }
        }
        return {
          exists: true,
          matched,
          actualProperties: rule.properties,
        }
      }
    }

    return { exists: false, matched: {} }
  }

  const matched: Record<string, boolean> = {}
  for (const [key, expectedValue] of Object.entries(expectedProperties)) {
    const actualValue = matchingRule.properties[key]
    if (actualValue) {
      if (expectedValue instanceof RegExp) {
        matched[key] = expectedValue.test(actualValue)
      } else {
        matched[key] = normalizeCSSValue(actualValue) === normalizeCSSValue(expectedValue)
      }
    } else {
      matched[key] = false
    }
  }

  return {
    exists: true,
    matched,
    actualProperties: matchingRule.properties,
  }
}

/**
 * Normalize CSS values for comparison (remove extra spaces, handle quotes, etc.)
 */
function normalizeCSSValue(value: string): string {
  return value.trim().replace(/\s+/g, ' ').replace(/['"]/g, '').toLowerCase()
}

/**
 * Check if CSS contains expected styles by searching for property-value pairs
 * This is more flexible than checking specific class names
 */
export function checkCSSProperties(
  css: string,
  expectedProperties: Record<string, string | RegExp>,
): { found: boolean; matched: Record<string, boolean>; allRules: CSSRule[] } {
  const rules = parseCSS(css)
  const matched: Record<string, boolean> = {}
  let foundAny = false

  for (const [key, expectedValue] of Object.entries(expectedProperties)) {
    let found = false
    for (const rule of rules) {
      const actualValue = rule.properties[key]
      if (actualValue) {
        if (expectedValue instanceof RegExp) {
          if (expectedValue.test(actualValue)) {
            found = true
            foundAny = true
            break
          }
        } else if (normalizeCSSValue(actualValue) === normalizeCSSValue(expectedValue)) {
          found = true
          foundAny = true
          break
        }
      }
    }
    matched[key] = found
  }

  return {
    found: foundAny,
    matched,
    allRules: rules,
  }
}
