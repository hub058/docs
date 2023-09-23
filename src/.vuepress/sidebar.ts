import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    "slides/steps",
    {
      icon: "cache",
      text: "微服务",
      prefix: "cloud/",
      link: "cloud/",
      children: "structure",
      collapsible: true,
    },
    {
      icon: "java",
      text: "后端",
      prefix: "java/",
      link: "java/",
      children: "structure",
      collapsible: true,
    },
    {
      icon: "shell",
      text: "运维",
      prefix: "devops/",
      link: "devops/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "前端",
      icon: "html",
      prefix: "front/",
      link: "front/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "跨平台",
      icon: "module",
      prefix: "flutter/",
      link: "flutter/",
      children: "structure",
      collapsible: true,
    },
    {
      icon: "study",
      text: "面试题",
      prefix: "interview/",
      link: "interview/",
      children: "structure",
      collapsible: true,
    },
  ],
});
