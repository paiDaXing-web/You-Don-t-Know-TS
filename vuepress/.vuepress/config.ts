import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

import recoTheme from 'vuepress-theme-reco'

export default defineUserConfig({
  title: 'TS/JS从书系列',
  description: 'Just playing around',
  theme: recoTheme({
    style: '@vuepress-reco/style-default',
    logo: '/logo.png',
    author: 'maxueming',
    docsRepo: 'https://github.com/paiDaXing-web/You-Don-t-Know-TS',
    docsBranch: 'main',
    docsDir: 'example',
    lastUpdatedText: '',
    // series 为原 sidebar
    commentConfig: {
      type: 'valine',
      options: {
        appId: 'ruETVFJr7b2RWtzUVt27xcgl-gzGzoHsz', // your appId
        appKey: 'zQaIwV58xzD8AS6GKTh55KyD', // your appKey
        hideComments: true, // 全局隐藏评论，默认 false
      },
    },

    series: {
      '/docs/theme-reco/': [
        {
          text: '第一卷:基础概念篇',
          children: [
            'base-1',
            'base-2',
            'base-3',
            'base-4',
            'base-5',
            'base-6',
            'base-7',
            'base-8',
            'base-9',
            'base-10',
            'base-11',
            'base-12',
            'base-13',
            'base-14',
            'base-15',
            'base-16',
            'base-17',
          ],
        },
        {
          text: '第二卷:原理进阶篇',
          children: [
            'Advanced-1',
            'Advanced-2',
            'Advanced-3',
            'Advanced-4',
            'Advanced-5',
          ],
        },
      ],
      '/docs/challenge/': [
        {
          text: '第一章:简单',
          children: [
            '1.1.hello-world',
            '1.2.Pick',
            '1.3.Awaited',
            '1.4.Readonly',
            '1.5.Tuple-to-object',
            '1.6.First-of-array',
            '1.7.Length-of-Tuple',
            '1.8.concat',
            '1.9.exclude',
            '1.10.if',
            '1.11.includes',
            '1.12.parameters',
            '1.13.push',
            '1.14.unshift',
          ],
        },
        {
          text: '第二章:中等',
          children: ['2.1.Get-Return-Type', '2.2.omit', '2.3.Readonly2'],
        },
        {
          text: '第三章:困难',
          children: [
            'hard/Simple-Vue',
            'hard/Simple-Vue',
            'hard/Simple-Vue',
            'hard/Simple-Vue',
          ],
        },
      ],
      '/docs/you-dont-js/up-going/': [
        {
          text: '入门与进阶',
          children: ['ch0', 'foreword', 'ch1', 'ch2', 'ch3', 'apA'],
        },
        {
          text: '作用域与闭包',
          children: [
            'scope-closures-README',
            'scope-closures-ch1',
            'scope-closures-ch2',
            'scope-closures-ch3',
            'scope-closures-ch4',
            'scope-closures-ch5',
            'scope-closures-apA',
            'scope-closures-apB',
            'scope-closures-apC',
            'scope-closures-apD',
          ],
        },
        {
          text: 'this与对象原型',
          children: [
            'this-object-prototypes-README',
            'this-object-prototypes-foreword',
            'this-object-prototypes-ch1',
            'this-object-prototypes-ch2',
            'this-object-prototypes-ch3',
            'this-object-prototypes-ch4',
            'this-object-prototypes-ch5',
            'this-object-prototypes-ch6',
            'this-object-prototypes-apA',
            'this-object-prototypes-apB',
          ],
        },
        {
          text: '类型与语法',
          children: [
            'types-grammar-README',
            'types-grammar-foreword',
            'types-grammar-ch1',
            'types-grammar-ch2',
            'types-grammar-ch3',
            'types-grammar-ch4',
            'types-grammar-ch5',
            'types-grammar-apA',
            'types-grammar-apB',
          ],
        },
        {
          text: '异步与性能',
          children: [
            'async-performance-README',
            'async-performance-foreword',
            'async-performance-ch1',
            'async-performance-ch2',
            'async-performance-ch3',
            'async-performance-ch4',
            'async-performance-ch5',
            'async-performance-ch6',
            'async-performance-apA',
            'async-performance-apB',
            'async-performance-apC',
          ],
        },
        {
          text: 'ES6与未来',
          children: [
            'es6-beyond-README',
            'es6-beyond-foreword',
            'es6-beyond-ch1',
            'es6-beyond-ch2',
            'es6-beyond-ch3',
            'es6-beyond-ch4',
            'es6-beyond-ch5',
            'es6-beyond-ch6',
            'es6-beyond-ch7',
            'es6-beyond-ch8',
            'es6-beyond-apA',
          ],
        },
      ],
      '/docs/you-dont-js-en': [
        {
          text: 'Get Started',
          children: [
            'get-started-README',
            'get-started-foreword',
            'get-started-ch1',
            'get-started-ch2',
            'get-started-ch3',
            'get-started-ch4',
            'get-started-apA',
            'get-started-apB',
          ],
        },
        {
          text: 'Scope & Closures',
          children: [
            'scope-closures-README',
            'scope-closures-ch1',
            'scope-closures-ch2',
            'scope-closures-ch3',
            'scope-closures-ch4',
            'scope-closures-ch5',
            'scope-closures-ch6',
            'scope-closures-ch7',
            'scope-closures-ch8',
            'scope-closures-ch5',
            'scope-closures-apA',
            'scope-closures-apB',
           1
          ],
        },
        {
          text: 'Objects & Classes',
          children: [
            'objects-classes-README',
            'objects-classes-foreword',
            'objects-classes-ch1',
            'objects-classes-ch2',
            'objects-classes--ch3',
            'objects-classes-ch4',
            'objects-classes-ch5',
           
          ],
        },
        {
          text: ' Types & Grammar',
          children: [
            'types-grammar-README',
            'types-grammar-foreword',
            'types-grammar-ch1',
            'types-grammar-ch2',
            'types-grammar-ch3',
            'types-grammar-ch4',
          
          ],
        },
        {
          text: ' Sync & Async ',
          children: [
            'sync-async-README',
            'sync-async-foreword',
            'sync-async-ch1',
           
          ],
        },
        {
          text: ' ES.Next & Beyond',
          children: [
            'es-next-beyond-README',
            'es-next-beyond-foreword',
            'es-next-beyond-ch1',
           
          ],
        },
      ],
    },
    navbar: [
      { text: '首页', link: '/' },

      {
        text: '《TypeScript》',
        children: [
          { text: '第一卷', link: '/docs/theme-reco/base-1' },
          { text: '第二卷', link: '/docs/theme-reco/Advanced-1' },
        ],
      },
      {
        text: '《You-dont-know-Js》',
        children: [
          { text: '简体中文', link: '/docs/you-dont-js/up-going/ch0' },
          {
            text: 'English',
            link: '/docs/you-dont-js-en/get-started-README',
          },
        ],
      },
      {
        text: 'TS挑战',
        children: [
          { text: '简单', link: '/docs/challenge/1.1.hello-world.html' },
          { text: '中等', link: '/blogs/other/guide' },
          { text: '困难', link: '/blogs/other/guide' },
        ],
      },
      {
        text: 'Github',
        link: 'https://github.com/paiDaXing-web/You-Don-t-Know-TS',
      },
    ],

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

  base: '/you-dont-know-ts/',
  // debug: true,
})
