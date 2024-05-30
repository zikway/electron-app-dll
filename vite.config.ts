import { resolve } from "node:path";
import { cwd, env } from "node:process";
import { defineConfig, externalizeDepsPlugin, swcPlugin } from "electron-vite";
import type { ElectronViteConfig } from "electron-vite";
import type { LibraryFormats } from "vite";
import { loadEnv } from "vite";
import dayjs from "dayjs";
import pkg from "./package.json";
// import {format as dayFormat } from 'dayjs'
import { setupVitePlugins } from "./build/plugins";
import { createViteProxy } from "./build/config";
import { OUT_DIR } from "./build/constants";

export default defineConfig(({ command, mode }) => {
  // const esmodule = pkg?.type === 'module'
  // const isBuild = command === 'build'

  const viteEnv = loadEnv(mode, cwd()) as unknown as Env.ImportMeta;
  const buildTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

  const isServe = command === "serve";
  const sourcemap = isServe || Boolean(env.VSCODE_DEBUG);
  const esmodule = false;
  const mainConfig: ElectronViteConfig["main"] = {
    root: resolve(__dirname),
    resolve: {
      alias: {
        $: resolve("electron")
      }
    },
    build: {
      sourcemap,
      outDir: resolve(__dirname, OUT_DIR, "dist-electron/main"),
      lib: {
        entry: resolve(__dirname, "electron/main/index.ts"),
        formats: ["cjs"] as LibraryFormats[]
      },
      rollupOptions: {
        input: {
          index: resolve(__dirname, "electron/main/index.ts")
        },
        output: {
          inlineDynamicImports: true,
          entryFileNames: `[name].${esmodule ? "mjs" : "js"}`,
          chunkFileNames: `[name].${esmodule ? "mjs" : "js"}`,
          assetFileNames: "[name].[ext]"
        },
        external: Object.keys("dependencies" in pkg ? pkg.dependencies : {})
      }
    },
    plugins: [externalizeDepsPlugin(), swcPlugin()]
  };
  const preloadConfig: ElectronViteConfig["preload"] = {
    build: {
      sourcemap,
      outDir: resolve(__dirname, OUT_DIR, "dist-electron/preload"),
      rollupOptions: {
        input: {
          preload: resolve(__dirname, "electron/preload/index.ts")
        },
        output: {
          inlineDynamicImports: true,
          entryFileNames: `[name].${esmodule ? "mjs" : "js"}`,
          chunkFileNames: `[name].${esmodule ? "mjs" : "js"}`,
          assetFileNames: "[name].[ext]"
        },
        external: Object.keys("dependencies" in pkg ? pkg.dependencies : {})
      }
    },
    plugins: [externalizeDepsPlugin()]
  };
  const rendererConfig: ElectronViteConfig["renderer"] = {
    root: resolve(__dirname),
    resolve: {
      alias: {
        "@": resolve("src"),
        "#": resolve("types"),
        "~": resolve("")
      }
    },
    build: {
      sourcemap,
      outDir: resolve(__dirname, OUT_DIR, "dist"),
      rollupOptions: {
        input: resolve(__dirname, "index.html")
        // output: {
        //   // dir: resolve(__dirname, OUT_DIR, 'dist'),
        //   inlineDynamicImports: true,
        //   entryFileNames: `[name]-[hash].${esmodule ? 'mjs' : 'js'}`,
        //   chunkFileNames: `[name]-[hash].${esmodule ? 'mjs' : 'js'}`,
        //   assetFileNames: '[name]-[hash].[ext]'
        // }
      },
      // css: {
      //   preprocessorOptions: {
      //     scss: {
      //       additionalData: `@use "./src/styles/scss/global.scss" as *;`
      //     }
      //   }
      // },
      commonjsOptions: {
        ignoreTryCatch: false
      },
      reportCompressedSize: false
    },
    preview: {
      port: 9725
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/scss/global.scss" as *;`
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: 9527,
      open: false,
      proxy: createViteProxy(viteEnv, command === "serve"),
      fs: {
        cachedChecks: false
      }
    },
    plugins: setupVitePlugins(viteEnv),
    define: {
      BUILD_TIME: JSON.stringify(buildTime),
      __INTLIFY_JIT_COMPILATION__: true
    }
  };
  return {
    main: mainConfig,
    preload: preloadConfig,
    renderer: rendererConfig
  };
});
