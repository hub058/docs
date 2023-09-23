import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "稀客大大",
  description: "稀客大大的学习网站",

  theme,

  plugins: [
    docsearchPlugin({
      appId: "LB4MLU4E9H",
      apiKey: "db084a3b03e154f03a0015a16fe37818",
      indexName:"books_index"
    }),
  ],

  // Enable it with pwa
  shouldPrefetch: false,
});
