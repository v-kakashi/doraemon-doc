---
category: 说明
category-order: 1
title: 发布 GitHub Pages
article-order: 2
---

---

## GitHub Pages 是什么？

为 GitHub 中的项目创建静态网站，[访问创建指南](https://pages.github.com/)。

---

## 如何发布到 GitHub Pages

1. 创建一个 GitHub Pages 项目，如项目名为 myBlog
2. 因为 GitHub Pages 生成出的网站是以项目为二级目录的，如: `https://xxxxx.github.io/myBlog`，所以我们要设置一个发布的目录，运行命令如：`doraemon-doc doc --build --publicPath /myBlog`
3. 安装 [gh-pages](https://github.com/tschaub/gh-pages) , `npm i gh-pages -g`
4. 发布到 GitHub 上 `gh-pages -d __site`
