---
category: 说明
title: 工具安装
---
---

## 说明

一款文档生成器，能把 markdown 文件转化成 HTML 网站，方便开发者编写组件的说明文档。

*** 基于 ant 的文档生成器上做了改造，使其支持手机例子的显示和 VUE 代码的识别 ***

## 特点
1. 在 markdown 文件中编写 HTML、JS、VUE、CSS 代码，并且编译成网站。
2. 将 markdown 文件中的代码生成 demo 网页
3. 支持自定义生成模板

## 安装

```bash
  npm install kakashi-doc -g
```

## 使用

```bash
  kakashi-doc
```

### 命令说明


```bash
  kakashi-doc          生成 demo(http://127.0.0.1:8002)

  kakashi-doc [options]

    -h, --help       显示使用信息
    -v, --version    工具的版本号
    --dest <dir>     配置输出网站的目录, 默认 __site 目录
    --source <dir>   配置文档源目录, 默认 examples 目录
    --asset <dir>    配置表态资源文件目录, 默认 statics 目录
    --tpl <path>     配置显示模板文件
    --port <number>  网站的端口号, 默认 8002
    --build          生成网站
    -w, --watch      已监听模式启动 --build 命令
```

### 命令使用

```bash
kakashi-doc --build
```

**before**
```
./
├── README.md
├── examples
│   ├── a.js
│   ├── a.html
│   └── b.md
└── statics
    └── data.json
```

**after**
```
./
├── README.md
├── __site
│   ├── common.js
│   ├── examples
│   │   ├── a.html
│   │   ├── a.js
│   │   ├── b.html
│   │   ├── b.js
│   ├── index.html
│   └── statics
│       └── data.json
└── examples
    ├── a.js
    ├── a.html
    └── b.md
```

## Demos

访问 https://github.com/v-kakashi/kakashi-ui
