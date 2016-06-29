---
title: Tree 树形控件
type: Tree
---

## 何时使用

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用`树控件`可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## 代码演示

```html
<div id="app">
  <vk-tree>
    <vk-tree-node title="工程院开发管理部门">
      <vk-tree-node title="福建网龙计算机网络">
        <vk-tree-node title="美术中心一部"></vk-tree-node>
        <vk-tree-node title="美术中心二部"></vk-tree-node>
        <vk-tree-node title="美术中心三部"></vk-tree-node>
      </vk-tree-node>
      <vk-tree-node title="福州软件职业技术学院"></vk-tree-node>
    </vk-tree-node>
    <vk-tree-node title="福建一零一教育科技有限公司">
      <vk-tree-node title="开发一部"></vk-tree-node>
      <vk-tree-node title="开发二部"></vk-tree-node>
      <vk-tree-node title="开发三部"></vk-tree-node>
    </vk-tree-node>
    <vk-tree-node title="香港分公司"></vk-tree-node>
  </vk-tree>
</div>
```

```js
import vkTreeNode from 'kakashi-ui/src/tree/TreeNode'
import vkTree from 'kakashi-ui/src/tree/Tree'
import Vue from 'vue'
new Vue({
  el: "#app",
  components: {
    vkTreeNode,
    vkTree
  }
})
```

## vkTreeNode

| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|-------|
| selectKeys | 选中选项 | Array  | null    |
| extra | 扩展字段 | Object | null |
| dataSoures | 数据源 | Array | [] |
