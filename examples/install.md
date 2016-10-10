---
category: 说明
title: 工具安装
---
---

## 说明

一款文档生成器，能把 markdown 文件转化成 HTML 网站，方便开发者编写组件的说明文档。

---
## 特点
1. 在 markdown 文件中编写 HTML、JS、VUE、CSS 代码，并且编译成网站。
2. 将 markdown 文件中的代码生成 demo 网页。
3. 支持自定义生成模板。
4. 支持评论功能。

---

## 预装软件

- [nodejs](http://nodejs.org/)
- [cmder](http://cmder.net/) 在 window 环境下使用该软件进行操作

---

## 使用

### 安装

```bash
  npm install doraemon-doc -g --registry=https://registry.npm.taobao.org
```

### 安装模板
```bash
  doraemon-doc install
```
[kakashi-doc-template](https://github.com/v-kakashi/kakashi-doc-template) 为文档生成器推荐显示模板，用户也可以自定义皮肤(目前只支持默认模板)

### 生成网站

在创建 `/examples/install.md` 文件内容如下：

```
---
category: 说明
title: 工具安装
---

## 说明

一款文档生成器，能把 markdown 文件转化成 HTML 网站，方便开发者编写组件的说明文档。
```

运行如下命令

```bash
  doraemon-doc doc
```


### 命令说明

```bash
  doraemon-doc instal <template> 项目初始下载显示模板, 默认 kakashi-doc-template

  doraemon-doc doc    生成演示网站(http://127.0.0.1:7788)

  doraemon-doc doc [options]

    -h, --help       显示使用信息
    -v, --version    工具的版本号
    --dest <dir>     输出网站的目录, 默认 __site 目录
    --source <dir>   配置文档源目录, 默认 examples 目录
    --asset <dir>    配置静态资源文件目录, 默认 statics 目录
    --tpl <path>     配置显示模板文件
    --duoshuoName <string> 启用并设置对应的 多说 项目名
    --port <number>  网站的端口号, 默认 7788
    --build          生成网站
    --index <path>   自定义首页地址, 默认 ./examples/install.html
    -w, --watch      已监听模式启动 --build 命令
```

### 目录变化

**编译前**
```
./
├── README.md
└── examples
│   ├── a.md
│   └── b.md
└── tpl
    └── static
        └── data.json
```

**编译后**
```
./
├── README.md
├── __site
│   ├── common.js
│   ├── examples
│   │   ├── a.html
│   │   ├── a-demo.html
│   │   ├── b.html
│   │   ├── b-demo.html
│   ├── index.html
│   └── statics
│       └── data.json
├── examples
│   ├── a.md
│   └── b.md
└── tpl
    └── static
        └── data.json
```
