import { resolve } from 'node:path'
import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import UnoCSS from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { VitePWA } from 'vite-plugin-pwa'
import { createHtmlPlugin } from 'vite-plugin-html'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import autoprefixer from 'autoprefixer'

const consoleCDN = 'https://cdn.bootcdn.net/ajax/libs/vConsole/3.15.1/vconsole.min.js'
// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_APP_BASE_URL } = loadEnv(mode, './env')

  console.log(VITE_APP_BASE_URL, mode)

  return {
    envDir: './env',
    base: '',
    plugins: [
      VueRouter({
        routesFolder: 'src/views',
        extensions: ['.vue', '.page.tsx'],
        exclude: ['**/components/**/*'],
        dts: './types/typed-router.d.ts',
        importMode: 'async'
      }),
      vue({
        script: {
          propsDestructure: true,
          defineModel: true
        }
      }),
      legacy({}),
      vueJsx({}),
      UnoCSS(),
      // 自动导入 import xx from xx
      AutoImport({
        imports: ['vue', VueRouterAutoImports, 'pinia', '@vueuse/core'],
        dts: 'types/auto-imports.d.ts',
        eslintrc: {
          enabled: false
        }
      }),
      Components({
        dirs: ['src/components'],
        extensions: ['vue', 'tsx'],
        resolvers: [VantResolver({ importStyle: false })],
        // 配置文件生成位置
        dts: 'types/components.d.ts'
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
        symbolId: 'icon-[name]',
        inject: 'body-first',
        customDomId: '__svg__icons__dom__'
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            injectScript:
              mode !== 'staging'
                ? `<script src="${consoleCDN}"></script>
                  <script onLoad>
                    var vConsole = new VConsole();
                  </script>`
                : ''
          }
        }
      }),
      VitePWA({
        base: './', // 请保持与 base 配置一直
        registerType: 'autoUpdate',
        workbox: {
          clientsClaim: true,
          skipWaiting: true
        },
        includeAssets: ['favicon.svg'],
        manifest: {
          name: 'xxx-server',
          short_name: 'self',
          theme_color: '#4E86FF'
        }
      })
    ],
    resolve: {
      alias: [{ find: '@', replacement: resolve(__dirname, './src') }]
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['Android 4.1']
          })
        ]
      }
    },
    esbuild: {
      // 仅在生产环境下启用消除console、debugger
      drop: mode === 'production' ? ['console', 'debugger'] : []
    },
    build: {
      chunkSizeWarningLimit: 1200,
      assetsDir: 'static/img/',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  }
}
