---
home: true
modules:
  - BannerBrand
  - MdContent
  - Footer
bannerBrand:
  heroImage: /logo.png
  heroImageStyle:
    maxWidth: "300px"
    width: "100%"
    display: block
    margin: "0 auto 1rem"
    borderRadius: "1rem"
  bgImage: "/bg.svg"
  heroText: You-Don't-Know-TypeScript
  tagline: 这是一个专注研究Typescript的网站，在这里你可以全面深入学习Typescript相关知识，你还可以挑战相应的题目，快来学习吧。
  buttons:
    - { text: 我要学习, link: "/you-dont-know-ts/docs/theme-reco/base-1.html" }
    - {
        text: 我要挑战,
        link: "/you-dont-know-ts/docs/challenge/1.1.hello-world.html",
        type: "plain",
      }
isShowTitleInHome: true
actionText: About
actionLink: /views/other/about
features:
  - title: 过去
    details: 开发一款看着开心、写着顺手的 vuepress 博客主题。
  - title: 当下
    details: 帮助更多的朋友节省时间去用心书写内容，而不是仅仅配置一个博客去孤芳自赏。
  - title: 未来
    details: 吸引更多的朋友参与到开发中来，继续强大功能。
---

## 快速开始

**npx**

```bash
# 初始化，并选择 2.x
npx @vuepress-reco/theme-cli init
```

**npm**

```bash
# 初始化，并选择 2.x
npm install @vuepress-reco/theme-cli@1.0.7 -g
theme-cli init
```

**yarn**

```bash
# 初始化，并选择 2.x
yarn global add @vuepress-reco/theme-cli@1.0.7
theme-cli init
```
