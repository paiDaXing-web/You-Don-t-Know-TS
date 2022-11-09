import { defineUserConfig } from "vuepress";
import sandboxPlugin from "vuepress-plugin-sandbox";
import recoTheme from "vuepress-theme-reco";
import { plugins } from "./plugins";

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
    commentConfig: {
      type: "valine",
      options: {
        appId: "ruETVFJr7b2RWtzUVt27xcgl-gzGzoHsz", // your appId
        appKey: "zQaIwV58xzD8AS6GKTh55KyD", // your appKey
        hideComments: true, // 全局隐藏评论，默认 false
      },
    },
    series: {
      "/docs/theme-reco/": [
        {
          text: "第一卷:基础概念篇",
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
          text: "第二卷:原理进阶篇",
          children: [
            "Advanced-1",
            "Advanced-2",
            "Advanced-3",
            "Advanced-4",
            "Advanced-5",
          ],
        },
      ],
      "/docs/challenge/": [
        {
          text: "第一章:简单",
          children: ["1.1.hello-world", "1.2.Pick"],
        },
        {
          text: "第二章:中等",
          children: [
            "middle/1.Pick",
            "middle/Pick",
            "middle/Pick",
            "middle/Pick",
            "middle/Pick",
            "middle/Pick",
            "middle/Pick",
          ],
        },
        {
          text: "第三章:困难",
          children: [
            "hard/Simple-Vue",
            "hard/Simple-Vue",
            "hard/Simple-Vue",
            "hard/Simple-Vue",
          ],
        },
      ],
    },
    navbar: [
      { text: "首页", link: "/" },
      //   { text: "Categories", link: "/categories/reco/1/" },
      { text: "Tags", link: "/tags/tag1/1/" },
      {
        text: "TypeScript",
        children: [
          { text: "第一卷", link: "/docs/theme-reco/base-1" },
          { text: "第二卷", link: "/docs/theme-reco/Advanced-1" },
        ],
      },
      {
        text: "挑战",
        children: [
          { text: "简单", link: "/docs/challenge/easy" },
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
          content: `🎉🎉🎉 《You Dont Know TypeScript》本书正式发布,欢迎大家Issues 问题，积极交流，如遇问题可联系作者。`,
          style: "font-size: 12px;",
        },
        {
          type: "hr",
        },
        {
          type: "title",
          content: "管理员微信",
        },
        {
          type: "text",
          content: `
          <ul>
            <li>小助手1：MXM13641044045</li>
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
            <li><a href="https://github.com/paiDaXing-web">Github<a/></li>
            <li><a href="https://github.com/paiDaXing-web/You-Don-t-Know-TS/issues">Issues<a/></li>
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
              link: "/you-dont-know-ts/docs/others/donate.html",
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

  base: "/you-dont-know-ts/",
  // debug: true,
  plugins,
});
