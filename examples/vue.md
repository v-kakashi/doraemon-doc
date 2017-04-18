---
category: 解析 HTML & JS
category-order: 2
title: 支持 VUE 语法
---

---

> doraemon-doc 支持在 markdown 中编写 JS 代码 和 使用 VUE 框架

## 什么是 vue ?

Vue.js（读音 /vjuː/, 类似于 view）是一个构建数据驱动的 web 界面的库。Vue.js 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。

Vue.js 自身不是一个全能框架——它只聚焦于视图层。因此它非常容易学习，非常容易与其它库或已有项目整合。另一方面，在与相关工具和支持库一起使用时，Vue.js 也能完美地驱动复杂的单页应用。

如果你是有经验的前端开发者，想知道 Vue.js 与其它库/框架的区别，查看[对比其它框架](http://cn.vuejs.org/guide/comparison.html)；

如果你对使用 Vue.js 开发大型应用更感兴趣，查看[构建大型应用](http://cn.vuejs.org/guide/application.html)。


## 代码演示

```html
<div style="padding-top:20px;">
  <h2>todo list</h2>
  <div class="group">
    <div class="group-body" id="app">
      <input v-model="newTodo" v-on:keyup.enter="addTodo">
      <ul>
        <li v-for="todo in todos">
          <span>{{ todo.text }}</span>
          <button v-on:click="removeTodo($index)">X</button>
        </li>
      </ul>
    </div>
  </div>
</div>
```


```js
import Vue from 'vue'
new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todos: [
      { text: 'Add some todos' }
    ]
  },
  methods: {
    addTodo () {
      var text = this.newTodo.trim()
      if (text) {
        this.todos.push({ text: text })
        this.newTodo = ''
      }
    },
    removeTodo (index) {
      this.todos.splice(index, 1)
    }
  }
})


```
