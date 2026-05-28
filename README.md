# tflow.online 在线帮助文档站点


## 本地开发方法

项目启动：pnpm docs:dev

默认本地访问： http://localhost:5173/

## 发布到 Cloudflare Pages

项目已配置 GitHub Actions：`.github/workflows/deploy-cloudflare-pages.yml`。

推送到 `main` 分支或手动触发 workflow 时，会执行：

1. 安装 pnpm 和 Node.js
2. `pnpm install --frozen-lockfile`
3. `pnpm docs:build`
4. 通过 `npx wrangler@latest pages deploy .vitepress/dist` 发布到 Cloudflare Pages

需要在 GitHub 仓库中配置：

- Secret：`CLOUDFLARE_API_TOKEN`
- Secret：`CLOUDFLARE_ACCOUNT_ID`
- Variable：`CLOUDFLARE_PAGES_PROJECT_NAME`

Cloudflare API Token 需要具备 Cloudflare Pages 的编辑/部署权限。
