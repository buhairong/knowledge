import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import visualizer from 'rollup-plugin-visualizer'
import importElementPlus from 'vite-plugin-element-plus'

export default ({ mode }: { mode: any }) => {
  const SERVER_URL: string = loadEnv(mode, process.cwd()).VITE_BASE_URL

  return defineConfig({
    plugins: [
      vue(),
      vueJsx({
        transformOn: true,
        mergeProps: true
      }),
      visualizer(),
      // @ts-ignore 此处暂时需要使用 ignore
      // 原因是包内部的 options 未做非必填兼容
      // 目前已有人提了 PR，未合并，使用可以观望下
      importElementPlus()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 4000,
      proxy: {
        '/api': {
          target: SERVER_URL
        }
      }
    }
  })
}
