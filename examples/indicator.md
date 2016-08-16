---
category: 组件
title: Indicator 加载控件
---

## 说明



## 代码演示

```html
<div id="app">
  <div class="group">
    <div class="group-body group-body-icons">
      <vk-button @click="handleClick">显示</vk-button>
      <vk-indicator :visible="isShow" text="加载中"></vk-indicator>
    </div>
  </div>
</div>
```


```js
import vkIndicator from 'kakashi-ui/src/indicator'
import vkButton from 'kakashi-ui/src/Button'
import Vue from 'vue'

import 'kakashi-theme/src/components/indicator.less'
import 'kakashi-theme/src/components/spinner.less'
import 'kakashi-theme/src/components/button.less'

new Vue({
  el: "#app",
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    handleClick ($event) {
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
      }, 5000);
    }
  },
  components: {
    vkIndicator,
    vkButton
  }
})


```

## Props

| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|-------|
| text | 加载文字 | String  | ''    |
| visible | 是否显示 | Boolean  | false |
