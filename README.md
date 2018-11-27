# vue2-drag
[![npm version](https://badge.fury.io/js/vue2-drag.png)](https://badge.fury.io/js/vue2-drag)
> Vue component for drag and drop

## Demo
[Demo](https://zhao-jun.github.io/vue2-drag/)

## Install
```
yarn add vue2-drag
```
## Usage
```javascript
import Vue from 'vue'
import VueDrag from 'vue2-drag'

Vue.use(VueDrag)
```

## Props
### styleList
Type: `Array`<br>
Required: `false`<br>
Default:
```javascript
[{
  left: "50px",
  top: "50px",
  width: "50px",
  height: "50px",
  backgroundColor: "aqua",
  zIndex: 0
}]
```
css样式数组，根据数组长度创建相应个数的拖放元素

### htmlList
Type: `Array`<br>
Required: `false`<br>
Default: `["drag-drop"]`

组件内容数组，长度和styleList相同，对应每个拖放元素的内容

### moveZIndex
Type: `Number`<br>
Required: `false`<br>
Default: `100`

拖放元素移动时的z-index

```html
<vue-drag :moveZIndex="100">
```

### cell
Type: `String`<br>
Required: `false`<br>
Default: `cell`

设置拖放元素的className和ref，按拖放元素顺序为`cell-0 cell-1...`，通过此可在父组件获取拖放元素进行动画等处理

```html
<vue-drag :cell="cell">
```

### mutiTouch
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

多个拖放元素是否可以同时拖放

```html
<vue-drag :mutiTouch="false">
```

### limited
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

拖放元素是否受到父元素位置限制

```html
<vue-drag :limited="false">
```

## Events
### start
Required: `false`<br>
Parameters:
* `e` Event

```html
<vue-drag @start="onStart">
```

### move
Required: `false`<br>
Parameters:
* `e` Event
* `position` 元素、触点位置：
  - `position.top` 元素y轴方向位置
  - `position.left` 元素x轴方向位置
  - `position.x` 触点x轴方向位置
  - `position.y` 触点x轴方向位置

```html
<vue-drag @move="onMove">
```

### end
Required: `false`<br>
Parameters:
* `e` Event
* `position` 元素、触点位置：
  - `position.top` 元素y轴方向位置
  - `position.left` 元素x轴方向位置
  - `position.x` 触点x轴方向位置
  - `position.y` 触点x轴方向位置
* `animation` 回调动画，传入移动元素、移动位置、过渡动画
  - `e` 移动元素
  - `position` 移动位置
    - Default: `{top: "0px", left: "0px"}`
  - `transition` 过渡动画
    - Default: `{duration: 500, easing: "ease-in-out"}`

```html
<vue-drag @end="onEnd">
```


## License

[MIT license](LICENSE)
