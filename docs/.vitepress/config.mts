import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "oneboi",
  base:'/',
  description: "",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '案例', link: '/markdown-examples' },
      { text: '书籍', link: '/booklist/bookindex' },
      { text: 'site', link: '/site/siteindex' }
    ],

    sidebar: [
      {
        text: '列表',
        items: [
          { text: 'article', link: '/article/articleindex' },
          { text: 'book', link: '/booklist/bookindex' }
          { text: 'soft', link: '/store/soft/soft' }
        ]
      },
      
    ],
     footer: {
      message: '<a href="https://beian.miit.gov.cn/#/Integrated/recordQuery">滇ICP备17010034号-1</a>.',
      copyright: 'Copyright © 2025-present'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
