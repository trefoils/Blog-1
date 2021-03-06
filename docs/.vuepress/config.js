const nav = require('./nav')
const sidebar = require('./sidebar')

module.exports = {
  title: 'Better late than never',
  description: '只要开始，虽晚不迟',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  markdown: {
    lineNumbers: true
  },
  extraWatchFiles: [
    '.vuepress/nav.js', 
    '.vuepress/sidebar.js'
  ],
  themeConfig: {
    sidebarDepth: 2,
    smoothScroll: true,
    repo: 'HondryTravis/Blog',
    nav,
    sidebar,
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 Github 上编辑此页',
    lastUpdated: '更新时间',
  },
  plugins: [
    ["@vuepress/medium-zoom", true],
    ["@vuepress/back-to-top", true],
  ],
}