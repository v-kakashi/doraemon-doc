---
category: 组件
title: Indicator 加载控件
---

## 说明



## 代码演示

```html
<div id="app">
  <div class="group">
    <header class="group-header">默认样式</header>
    <div class="group-body group-body-icons">
      <vk-indicator :visible="true" text="加载中"></vk-indicator>
    </div>
  </div>
</div>
```


```js
import vkIndicator from 'kakashi-ui/src/indicator'
import Vue from 'vue'

import 'kakashi-theme/src/components/indicator.less'
import 'kakashi-theme/src/components/spinner.less'

new Vue({
  el: "#app",
  components: {
    vkIndicator
  }
})
```

## vkIcon

| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|-------|
| value | 图标的图案 | String  | ''    |
| color | 图标颜色 | String | '' |
| class | 图标的 className | String | '' |
