# 留白 · GitHub Pages 博客

网站：https://ansujuner.github.io/

- 根目录：已编译的公开静态网站，由 GitHub Pages 从 `main` 分支自动发布。
- `source/`：可编辑的完整博客源码，包含首页、4 篇示例文章和关于我。
- 原博客保存在标签 `before-liubai-20260905`，历史提交未被重写。

## 修改与发布

需要 Node.js 22.13 或更高版本。

```sh
cd source
npm ci
npm run dev
```

编辑文章：`source/lib/posts.ts`。编辑首页摘要与链接：`source/app/page.tsx`。作者介绍位于 `source/app/about/page.tsx`。

修改完成后，在 `source` 目录运行：

```sh
npm run build
node scripts/export-github-pages.mjs
cd ..
git add .
git commit -m "Update blog"
git push origin main
```

GitHub Pages 会自动发布根目录的静态文件，无须额外服务器或数据库。保留 `.nojekyll`，否则 `_next` 静态资源可能无法发布。

当前正文和作者介绍仍为示例；海岸配图为 AI 创作。`source` 位于公开仓库，也可以经网站地址访问，请勿存入密码、令牌或个人敏感资料。私有 Sites 项目标识未包含在这份源码中。

## 恢复原博客

可从 GitHub 标签 `before-liubai-20260905` 查看和恢复替换前的文件；不必强制推送或重写历史。
