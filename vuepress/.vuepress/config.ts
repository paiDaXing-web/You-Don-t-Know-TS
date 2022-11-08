import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "You-Dont-Know-TS",
  description: "Just playing around",
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "maxueming",
    docsRepo: "https://github.com/paiDaXing-web/You-Don-t-Know-TS",
    docsBranch: "main",
    docsDir: "example",
    lastUpdatedText: "",
    // series 为原 sidebar
    series: {
      "/docs/theme-reco/": [
        {
          text: "Typescript基础知识",
          children: [
            "base-1",
            "base-2",
            "base-3",
            "base-4",
            "base-5",
            "base-6",
            "base-7",
            "base-8",
            "base-9",
            "base-10",
            "base-11",
            "base-12",
            "base-13",
            "base-14",
            "base-15",
            "base-16",
            "base-17",
          ],
        },
        {
          text: "Typescript进阶",
          children: [
            "Advanced-1",
            "Advanced-2",
            "Advanced-3",
            "Advanced-4",
            "Advanced-5",
          ],
        },
      ],
    },
    navbar: [
      { text: "首页", link: "/" },
      //   { text: "Categories", link: "/categories/reco/1/" },
      { text: "Tags", link: "/tags/tag1/1/" },
      {
        text: "教程",
        children: [
          { text: "基础", link: "/docs/theme-reco/base-1" },
          { text: "进阶", link: "/docs/theme-reco/Advanced-1" },
        ],
      },
      {
        text: "挑战",
        children: [
          { text: "简单", link: "/docs/theme-reco/theme" },
          { text: "中等", link: "/blogs/other/guide" },
          { text: "困难", link: "/blogs/other/guide" },
        ],
      },
      {
        text: "Github",
        link: "https://github.com/paiDaXing-web/You-Don-t-Know-TS",
      },
    ],
    bulletin: {
      body: [
        {
          type: "text",
          content: `🎉🎉🎉 reco 主题 2.x 已经接近 Beta 版本，在发布 Latest 版本之前不会再有大的更新，大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
          style: "font-size: 12px;",
        },
        {
          type: "hr",
        },
        {
          type: "title",
          content: "QQ 群",
        },
        {
          type: "text",
          content: `
          <ul>
            <li>QQ群1：1037296104</li>
            <li>QQ群2：1061561395</li>
            <li>QQ群3：962687802</li>
          </ul>`,
          style: "font-size: 12px;",
        },
        {
          type: "hr",
        },
        {
          type: "title",
          content: "GitHub",
        },
        {
          type: "text",
          content: `
          <ul>
            <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
            <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
          </ul>`,
          style: "font-size: 12px;",
        },
        {
          type: "hr",
        },
        {
          type: "buttongroup",
          children: [
            {
              text: "打赏",
              link: "/docs/others/donate.html",
            },
          ],
        },
      ],
    },
    // valineConfig 配置与 1.x 一致
    // valineConfig: {
    //   appId: 'xxx',
    //   appKey: 'xxx',
    //   placeholder: '填写邮箱可以收到回复提醒哦！',
    //   verify: true, // 验证码服务
    //   // notify: true,
    //   recordIP: true,
    //   // hideComments: true // 隐藏评论
    // },
  }),
  // debug: true,
});
