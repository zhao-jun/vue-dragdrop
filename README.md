# vue-dragdrop
Vue component for drag and drop

## Demo

## Install
```
yarn add vue-dragdrop
```
## Usage

## Props
### styleObject
Type: `Array`<br>
Required: `false`<br>
Default:
```
[{
  left: "50px",
  top: "50px",
  width: "50px",
  height: "50px",
  zIndex: 0
}]
```
根据数组长度创建相应个数的拖放元素

### moveZIndex
Type: `Number`<br>
Required: `false`<br>
Default: `100`

拖放元素移动时的z-index

```html
<vue-dragdrop :moveZIndex="100">
```

### cell
Type: `String`<br>
Required: `false`<br>
Default: `cell`

设置拖放元素的className和ref，按拖放元素顺序为`cell-0 cell-1...`，通过此可在父组件获取拖放元素进行动画等处理

```html
<vue-dragdrop :cell="cell">
```

### mutiTouch
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

多个拖放元素是否可以同时拖放

```html
<vue-dragdrop :mutiTouch="false">
```

## Events
### start
Required: `false`<br>
Parameters:
* `e` Event

```html
<vue-draggable-resizable @start="onStart">
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
<vue-draggable-resizable @move="onMove">
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

```html
<vue-draggable-resizable @end="onEnd">
```


## License

[MIT license](LICENSE)
