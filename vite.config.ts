import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { defineConfig, loadEnv } from 'vite';
import path from 'path';


export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite 配置
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    //插件导入
    plugins: [vue(),
    Components({
      resolvers: [
        VantResolver()
      ],
    }),],
    base: './',
    //配置别名
    resolve: {
      alias: {
        // 配置src目录
        "@": path.resolve(__dirname, "src"),
        // 导入其他目录
        "components": path.resolve(__dirname, "components")
      }
    },
    server: {
      host: "localhost",
      port: 5173,  // default 5173
      strictPort: true, // 设为TRUE时若端口被占用会直接退出，FALSE会尝试下一个可用端口
      open: true, // 自动打开浏览器；当此值为字符串时，会被用作 URL 的路径名
      proxy: {
        '/api': {
          // target: process.env.VUE_APP_INTERFACE_URL ?? "http://localhost:8080",
          target: "http://localhost:8080",
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            "^/api": "",
          },
        },
      },
    },
    // 引入第三方的配置
    optimizeDeps: {
      include: [],
    },
  }
})
