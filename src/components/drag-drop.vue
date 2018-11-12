<template>
  <div :class="$style.container">
    <div
      :class="$style.drag"
      :style="styleObject"
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
      type: Object,
      default: () => ({
        left: "50px",
        top: "50px",
        width: "50px",
        height: "50px"
      })
    }
  },
  data() {
    return {
      mutiPointer: 0,
      changingDom: [],
      currMovePic: ""
    };
  },
  mounted() {},
  methods: {
    start(e) {
      if (e.touches.length > 1 || e.targetTouches.length > 1) {
        this.mutiPointer = 1;
        return false;
      } else {
        this.mutiPointer = 0;
      }
      let touch;
      if (e.touches) {
        touch = e.touches[0];
      } else {
        touch = e;
      }
      if (this.changingDom.includes(touch.target)) return false;
      // 暂不支持同时移动两个
      if (this.currMovePic) return false;
      // (<any>e.target).style.zIndex = 100;
      this.currMovePic = e.target;
      // 记录位置，点击位置
      // console.log(e.target.style);
      this.position = {
        top: e.target.style.top,
        left: e.target.style.left,
        x: touch.pageX,
        y: touch.pageY
      };
    },
    move(e) {
      if (e.touches.length > 1 || e.targetTouches.length > 1) {
        this.mutiPointer = 1;
        return false;
      } else {
        this.mutiPointer = 0;
      }
      let touch;
      if (e.touches) {
        touch = e.touches[0];
      } else {
        touch = e;
      }
      if (this.changingDom.includes(touch.target)) return false;
      if (this.currMovePic !== touch.target) return false;
      let moveX = touch.pageX - this.position.x;
      let moveY = touch.pageY - this.position.y;
      e.target.style.left = parseFloat(this.position.left) + moveX + "px";
      e.target.style.top = parseFloat(this.position.top) + moveY + "px";
      // console.log(e.target.style.top, e.target.style.left);
    },
    end(e) {
      let touch;
      if (e.changedTouches) {
        touch = e.changedTouches[0];
      } else {
        touch = e;
      }
      this.$emit("end");
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
  }
}
</style>
