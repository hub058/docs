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
      apiKey: "b17f1fe317eddb3699edf886fcb93267",
      indexName:"books_index",
      searchParameters: {
        facetFilters: ['tags:v2'],
      },
    }),
  ],

  // Enable it with pwa
  shouldPrefetch: false,
});
