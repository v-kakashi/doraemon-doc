---
category: 组件
title: Msgbox 对话框组件
---


## 何时使用

弹出式提示框，有多种交互形式。

## 代码演示

```html
<div id="app">
  <vk-msgbox message="你好，程序员!">
    <div class="vk-msgbox-content" slot="content">
      <vk-image src="http://fanyi.baidu.com/static/translation/img/header/logo_cbfea26.png"></vk-image>
    </div>
  </vk-msgbox>
</div>
```

```js
import vkMsgbox from 'kakashi-ui/src/msgbox'
import vkImage from 'kakashi-ui/src/image'
import Vue from 'vue'

import 'kakashi-theme/src/components/image.less'
import 'kakashi-theme/src/components/msgbox.less'

new Vue({
  el: "#app",
  components: {
    vkMsgbox,
    vkImage
  }
})
```

## vkMsgbox

| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|-------|
| title | 提示框的标题 | String  | '标题' |
| message | 提示框的内容 | String  | ''    |
| showConfirmButton | 是否显示确认按钮 | Boolean | true |
| showCancelButton | 是否显示取消按钮 | Boolean | false |
| confirmButtonText | 确认按钮的文本 | String | '' |
| confirmButtonHighlight | 是否将确认按钮的文本加粗显示 | Boolean | false |
| confirmButtonClass | 确认按钮的类名 | String | '' |
| cancelButtonText | 取消按钮的文本 | String | '' |
| confirmButtonHighlight | 是否将确认按钮的文本加粗显示 | Boolean | false |
| cancelButtonHighlight | 是否将取消按钮的文本加粗显示 | Boolean | false |
| cancelButtonClass | 取消按钮的类名 | String | '' |
| showInput | 是否显示一个输入框 | Boolean | false |
| inputValue | 输入框的值 | String | '' |
| inputPlaceholder | 输入框的占位符 | String | '' |
