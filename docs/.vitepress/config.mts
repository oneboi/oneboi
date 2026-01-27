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
      { text: 'site', link: '/site/siteindex' },
      { text: '工具网站', link: '/tool/toolindex' },
      { text: '英语学习', link: '/english/englishindex' },
      { text: 'java', link: '/java/javaindex' },
      { text: 'python', link: '/python/pythonindex' },
      { text: 'vue', link: '/vue/vueindex' },
      { text: 'react', link: '/react/reactindex' },
      { text: 'springboot', link: '/springboot/springbootindex' },
      { text: 'design', link: '/design/designindex' },
      { text: 'media', link: '/media/mediaindex' },
      { text: 'words', link: '/words/wordsindex' },
      { text: 'UI', link: '/ui/uiindex' },

    ],
    sidebar: [
      {
        text: '导航',
        items: [
          { text: '文档', link: '/article/articleindex' },
          { text: '书籍收集', link: '/booklist/bookindex' },
          { text: '软件收集', link: '/store/soft/soft' },
          { text: 'media', link: '/media/mediaindex' },
          { text: 'words', link: '/words/wordsindex' },
          { text: 'vue', link: '/vue/vueindex' },
          { text: 'react', link: '/react/reactindex' }

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
