import { defineConfig } from "@unocss/vite";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import presetUno from "@unocss/preset-uno";
import type { Theme } from "@unocss/preset-uno";
import { presetSoybeanAdmin } from "@sa/uno-preset";
import { themeVars } from "./src/theme/vars";

export default defineConfig<Theme>({
  content: {
    pipeline: {
      exclude: ["node_modules", "output/dist"]
    }
  },
  theme: {
    ...themeVars,
    fontSize: {
      "icon-xs": "0.875rem",
      "icon-small": "1rem",
      icon: "1.125rem",
      "icon-large": "1.5rem",
      "icon-xl": "2rem"
    }
  },
  shortcuts: {
    "card-wrapper": "rd-8px shadow-sm"
  },
  rules: [
    ["win-drag", { "-webkit-app-region": "drag" }],
    ["win-no-drag", { "-webkit-app-region": "no-drag" }],
    ["disable-select", { "-webkit-user-select;": "none" }]
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetUno({ dark: "class" }), presetSoybeanAdmin()]
});
