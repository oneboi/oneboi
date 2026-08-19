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
      { text: 'skill', link: '/skill/skillindex' },
      { text: '自媒体', link: '/media/mediaindex' },
      { text: '书籍', link: '/booklist/bookindex' },
      { text: 'site', link: '/site/siteindex' },
      { text: 'design', link: '/design/designindex' },
      { text: 'words', link: '/words/wordsindex' }
    ],
    sidebar: [
      {
        text: '导航',
        items: [
          { text: '文档', link: '/article/articleindex' },
          { text: '书籍收集', link: '/booklist/bookindex' },
          { text: '软件收集', link: '/store/soft/soft' },
          { text: 'media', link: '/media/mediaindex' }
        ]
      },
      
    ],
     footer: {
      message: '<a href="https://beian.miit.gov.cn/#/Integrated/recordQuery"></a>.',
      copyright: 'Copyright © 2025-present'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
