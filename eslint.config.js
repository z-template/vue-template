import js from '@eslint/js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import globals from 'globals'

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
function parseAutoImportsDts(contents) {
  const matchResults = contents.matchAll(/^\s+const (\w+): typeof import/gm)
  return Array.from(matchResults, ([, word]) => word)
}

function uiPackageAutoImportGlobals() {
  const SRC = path.resolve(__dirname, './types/auto-imports.d.ts')

  const contents = fs.readFileSync(SRC, { encoding: 'utf-8' })
  const parsed = parseAutoImportsDts(contents)
  return parsed.reduce((acc, word) => {
    acc[word] = 'readonly'
    return acc
  }, {})
}
export default [
  {
    ignores: ['./dist/**/**.js', 'node_modules'],
    rules: {
      ...js.configs.recommended.rules,
      'max-lines': ['error', { max: 750, skipBlankLines: true, skipComments: true }]
    }
  },
  prettierConfig,
  {
    files: ['**/*.{ts,tsx,vue,cjs}'],
    ignores: ['./dist/**/**.js', 'node_modules', 'public', 'types', 'env'],
    plugins: {
      prettier: prettierPlugin
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...uiPackageAutoImportGlobals()
      }
    },
    rules: {
      'prettier/prettier': 'error'
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptEslint
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json']
      }
    },
    rules: {
      ...typescriptEslint.configs['recommended'].rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/brace-style': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/no-redeclare': 'off'
    }
  },
  {
    files: ['src/**/*.vue', 'src/**/*.tsx', 'src/**/*.ts'],
    plugins: {
      vue: vuePlugin
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        parser: typescriptParser,
        project: ['./tsconfig.json'],
        sourceType: 'module',
        extraFileExtensions: ['.vue']
      }
    },
    rules: {
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/component-tags-order': [
        'error',
        {
          order: [['template', 'script'], 'style']
        }
      ],
      'vue/html-self-closing': 'off'
    }
  }
]
