# Ansujuner's Blog

个人博客源码，使用 Astro 构建并自动发布到 GitHub Pages。

- 线上地址：<https://ansujuner.github.io/>
- 框架：Astro + Markdown
- 部署：GitHub Actions → GitHub Pages
- 搜索：Pagefind（构建时生成本地索引）

## 写一篇新文章

在 `src/content/posts/` 新建一个 `.md` 文件：

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

- `draft: true`：不会出现在正式网站、RSS、Sitemap 或搜索中。
- `featured: true`：可进入首页精选区（首页最多展示 3 篇）。
- 文件名会成为文章地址，建议使用简短英文和连字符，例如 `my-first-post.md`。

## 修改个人资料

统一编辑 `src/site.config.ts`，可修改：

- 站点名、简介与标语
- “最近在做”
- GitHub 和公开邮箱
- 导航项目

公开邮箱为空时不会显示。评论和统计默认关闭。

## 本地预览

```bash
npm install
npm run dev
```

访问终端显示的本地地址。全文搜索只会在完整构建后生成：

```bash
npm run build
npm run preview
```

## 发布

把修改推送到 `main` 分支即可。`.github/workflows/deploy.yml` 会自动检查、构建、生成搜索索引并部署。

## 目录

```text
src/
  components/       页面组件
  content/posts/    Markdown 文章
  layouts/          页面布局
  pages/            路由页面
  styles/           全局样式
  site.config.ts    站点配置
public/             图标、分享图等静态资源
```
