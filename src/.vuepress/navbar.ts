import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  { text: "微服务", icon: "cache", link: "/cloud/" },
  { text: "后端", icon: "java", link: "/java/" },
  { text: "运维", icon: "shell", link: "/devops/" },
  { text: "前端", icon: "html", link: "/front/" },
  { text: "跨平台", icon: "module", link: "/flutter/" },
  { text: "面试题", icon: "study", link: "/interview/" },
  { text: "知识付费", icon: "lock", link: "/pay/" },
  {
    text: "在线工具",
    icon: "network",
    children: [
      {
        text: "禅道",
        icon: "line",
        link: "http://d.heyige.cn/",
      },
      {
        text: "视频库",
        icon: "play",
        link: "https://space.bilibili.com/192421143",
      },
      {
        text: "代码仓库",
        icon: "gitlab",
        link: "http://heyige.cn/",
      },
      {
        text: "大牛的博客",
        icon: "gitlab",
        link: "http://codingsir.com/",
      },
    ],
  },
]);
