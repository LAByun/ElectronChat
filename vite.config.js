import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import electronRenderer from 'vite-plugin-electron-renderer';//配置才能进行渲染
import  electron  from 'vite-plugin-electron';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    electronRenderer({
      
    }),
    electron({
      entry: 'src-electron/main.js', // 主进程入口
      preload: 'src-electron/preload.js', // 显式指定预加载文件
      onstart: ({ startup }) => startup()
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
