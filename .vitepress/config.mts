import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",
  
  title: "Tflow Online 在线文档",
  description: "tflow.online 站点的在线帮助文档",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '文档', link: '/' },
      { text: '平台介绍', link: '/platform' },
      { text: 'Codex', link: '/codex' },
      { text: 'Claude CLI', link: '/claude-cli' },
      { text: 'CC Switch', link: '/cc-switch' },
      { text: 'Cherry Studio', link: '/cherry-studio' }
    ],

    sidebar: [
      {
        text: '模型工具配置',
        items: [
          { text: '配置总览', link: '/' },
          { text: '平台介绍', link: '/platform' },
          { text: 'Codex App 和 CLI', link: '/codex' },
          { text: 'Claude CLI', link: '/claude-cli' },
          { text: 'CC Switch', link: '/cc-switch' },
          { text: 'Cherry Studio', link: '/cherry-studio' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
