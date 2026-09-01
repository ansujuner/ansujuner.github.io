# 徐丰俊 / Xu Fengjun

个人介绍与博客网站，使用 Astro 构建并自动发布到 GitHub Pages。

- 线上地址：<https://ansujuner.github.io/>
- 公开身份：在校学生，杭州
- 页面语言：中文 / English
- 部署：GitHub Actions → GitHub Pages

## 修改个人资料

主要资料集中在 `src/site.config.ts`：

- 中文名、拼音/罗马字与个性签名
- 身份、所在地、兴趣和开源立场
- 邮箱、GitHub、哔哩哔哩链接
- “最近在做”与导航项目

主页内容在 `src/pages/index.astro`，完整自我介绍在 `src/pages/about.astro`。

## 写一篇新文章

在 `src/content/posts/` 新建 `.md` 文件：

```md
---
title: "文章标题"
description: "一段简短摘要"
publishDate: 2026-09-01
updatedDate: 2026-09-01
tags:
  - 开发
  - 随笔
featured: false
draft: false
---

从这里开始写正文。
```

- `draft: true`：不会进入正式网站、RSS、Sitemap 或搜索。
- 文件名会成为文章地址，建议使用简短英文和连字符。
- 当前没有公开文章；文章、标签和归档路由会在有内容后自动进入 Sitemap。

## 本地预览

```bash
npm install
npm run dev
```

完整构建和自动校验：

```bash
npm run build
npm run preview
```

构建会检查类型、生成静态页面和全文搜索，并验证标题、SEO、RSS 及内部链接。

## 发布

推送到 `main` 分支后，`.github/workflows/deploy.yml` 会自动部署到 GitHub Pages。
