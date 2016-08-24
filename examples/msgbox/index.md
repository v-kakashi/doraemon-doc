---
category: 组件
title: Msgbox 对话框组件
---

## 何时使用

弹出式提示框，有多种交互形式。

## 代码演示

```html
<div id="app">
  <vk-button :on-touch="open" >打开对话框</vk-button>
  <vk-msgbox title="系统提示" :visible.sync="isVisible" :on-action="action" :show-cancel-button="true" message="你好，程序员!" ></vk-msgbox>
</div>
```

```js
import vkMsgbox from 'kakashi-ui/src/msgbox'
import vkButton from 'kakashi-ui/src/button'
import Vue from 'vue'

import 'kakashi-theme/src/components/button.less'
import 'kakashi-theme/src/components/msgbox.less'


new Vue({
  el: "#app",
  data () {
    return {
      isVisible : true
    }
  },
  methods: {
    open ($event) {
      this.isVisible = true
    },
    action (type) {
      alert(`button 类型: ${type}`)
    }
  },
  components: {
    vkMsgbox,
    vkButton
  }
})
```

## Props

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
| inputPattern | 正则较验 | Regexp | null |
| inputValidator | 自定义方法较验 | Function | null |
| inputErrorMessage | 错误提示信息 | String | '输入的数据不合法!' |
| visible | 是否显示 | Boolean | false |
| mask | 是否有遮罩 | Boolean | true |
| closeOnPressEscape | 是否支持 `ESC` 键退出 | Boolean | false |

---

## 事件
| 参数      | 说明                                     | 入参       |
|-----------|-----------------------------------------|------------|
| onAction | 点击对话框按钮回调 | actionType: confirm , cancel |




## Slot
| name      | 说明                                     |
|-----------|------------------------------------------|
| content | 自定义消息体的布局 |
