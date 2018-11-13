<template>
  <div :class="$style.container">
    <div
      :class="`${$style.drag} ${cellRef}-${index}`"
      v-for="(item, index) in styleObject"
      :key="index"
      :ref="`${cellRef}-${index}`"
      :style="item"
      @mousedown.prevent.stop="start"
      @touchstart.prevent.stop="start"
      @mousemove.prevent.stop="move"
      @touchmove.prevent.stop="move"
      @mouseup.prevent.stop="end"
      @touchend.prevent.stop="end"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    styleObject: {
      type: Array,
      default: () => [
        {
          left: "50px",
          top: "50px",
          width: "50px",
          height: "50px",
          zIndex: 0
        },
        {
          left: "50px",
          top: "150px",
          width: "50px",
          height: "50px",
          zIndex: 0
        }
      ]
    },
    moveZIndex: {
      type: Number,
      default: 100
    },
    cellRef: {
      type: String,
      default: "cell"
    },
    mutiTouch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mutiMove: 0,
      changingDom: [],
      currMove: ""
    };
  },
  methods: {
    start(e) {
      if (e.touches.length > 1 && !mutiTouch) return false;
      let touch = e.touches[0];

      // 暂不支持同时移动两个
      if (this.currMove) return false;
      e.target.style.zIndex = this.moveZIndex;
      this.currMove = e.target;
      // 元素位置e.target，点击位置touch
      this.position = {
        top: e.target.style.top,
        left: e.target.style.left,
        x: touch.pageX,
        y: touch.pageY
      };
      this.$emit("start", e, this.position);
    },
    move(e) {
      if (e.touches.length > 1 && !mutiTouch) return false;
      let touch = e.touches[0];

      if (this.currMove !== touch.target) return false;
      let moveX = touch.pageX - this.position.x;
      let moveY = touch.pageY - this.position.y;
      e.target.style.left = parseFloat(this.position.left) + moveX + "px";
      e.target.style.top = parseFloat(this.position.top) + moveY + "px";
      this.$emit("move", e, {
        top: e.target.style.top,
        left: e.target.style.left,
        x: touch.pageX,
        y: touch.pageY
      });
    },
    end(e) {
      if (e.changedTouches[0].target !== this.currMove) return false;
      let touch = e.changedTouches[0];

      this.$emit("end", e, {
        top: e.target.style.top,
        left: e.target.style.left,
        x: touch.pageX,
        y: touch.pageY
      });
      // reset
      this.currMove = "";
      this.position = {};
      e.target.style.zIndex = 0;
    },
    animation(e) {
      e.target.style.transition = "all .3s ease-in-out";
      e.target.style.left = "300px";
      setTimeout(() => {
        e.target.style.transition = null;
      }, 300);
    }
  }
};
</script>

<style lang="less" module>
.container {
  position: relative;
  .drag {
    position: absolute;
    background-color: aqua;
    z-index: 0;
  }
}
</style>
