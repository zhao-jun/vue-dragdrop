<template>
  <div class="container">
    <div
      :class="`drag ${cell}-${index}`"
      v-for="(item, index) in styleList"
      :key="index"
      :ref="`${cell}-${index}`"
      :style="item"
      :data-index="index"
      @mousedown.prevent.stop="start"
      @touchstart.prevent.stop="start"
      @touchmove.prevent.stop="move"
      @mouseup.prevent.stop="end"
      @touchend.prevent.stop="end"
    >
      {{ htmlList[index] }}
    </div>
  </div>
</template>

<script>
import { isMobile } from "@/utils";

export default {
  name: "VueDrag",
  props: {
    styleList: {
      type: Array,
      default: () => [
        {
          left: "50px",
          top: "50px",
          width: "50px",
          height: "50px",
          backgroundColor: "aqua",
          zIndex: 0
        }
      ]
    },
    htmlList: {
      type: Array,
      default: () => ["drag"]
    },
    moveZIndex: {
      type: Number,
      default: 100
    },
    cell: {
      type: String,
      default: "cell"
    },
    mutiTouch: {
      type: Boolean,
      default: false
    },
    changingDom: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currMove: "",
      position: []
    };
  },
  mounted() {
    if (!isMobile())
      document.documentElement.addEventListener("mousemove", this.move, true);
  },
  beforeDestroy() {
    if (!isMobile())
      document.documentElement.removeEventListener(
        "mousemove",
        this.move,
        true
      );
  },
  methods: {
    start(e) {
      let touches = e.touches || e;
      if (touches.length > 1 && !this.mutiTouch) return;
      if (this.changingDom.includes(e.target)) return;
      let dataIndex = e.target.dataset.index;
      let touch = (touches.length && e.targetTouches[0]) || touches;
      // (touches.length &&
      //   [...touches].filter(i => i.target.dataset.index == dataIndex)[0]) ||
      // touches;
      this.currMove = e.target;
      this.position[dataIndex] = {
        top: e.target.style.top,
        left: e.target.style.left,
        x: touch.pageX,
        y: touch.pageY
      };
      e.target.style.zIndex = this.moveZIndex;
      this.$emit("start", e);
    },
    move(e) {
      const isTouchMove = e.type.includes("touch");
      // pc
      if (!this.currMove && !isTouchMove) return;
      let target;
      let touches;
      if (e.touches) {
        // mobile
        touches = e.touches;
        target = e.target;
      } else {
        // pc
        touches = e;
        target = this.currMove;
      }
      // 禁止多指，默认禁止mutiTouch: false
      if (touches.length > 1 && !this.mutiTouch) return;
      let dataIndex = target.dataset.index;
      // 动画清除过程时直接进入move,没有经过start
      if (this.changingDom.includes(target) || !this.position[dataIndex])
        return;

      let touch = (touches.length && e.targetTouches[0]) || touches;
      // (touches.length &&
      //   [...touches].filter(i => i.target.dataset.index == dataIndex)[0]) ||
      // touches;
      let moveX = touch.pageX - this.position[dataIndex].x;
      let moveY = touch.pageY - this.position[dataIndex].y;
      target.style.left =
        parseFloat(this.position[dataIndex].left) + moveX + "px";
      target.style.top =
        parseFloat(this.position[dataIndex].top) + moveY + "px";
      this.$emit("move", e, {
        top: target.style.top,
        left: target.style.left,
        x: touch.pageX,
        y: touch.pageY
      });
    },
    end(e) {
      let touches = e.changedTouches || e;
      if (e.target !== this.currMove && !this.mutiTouch) return;
      let dataIndex = e.target.dataset.index;
      if (this.changingDom.includes(e.target) || !this.position[dataIndex])
        return;
      let touch = (touches.length && e.targetTouches[0]) || touches;
      // (touches.length &&
      //   [...e.changedTouches].filter(
      //     i => i.target.dataset.index == dataIndex
      //   )[0]) ||
      // touches;
      this.$emit("end", e, {
        top: e.target.style.top,
        left: e.target.style.left,
        x: touch.pageX,
        y: touch.pageY
      });
      // reset
      this.position[dataIndex] = null;
      this.currMove = "";
      e.target.style.zIndex = 0;
    }
  }
};
</script>

<style lang="less">
// Ignored attempt to cancel a touchstart event with cancelable=false, for example because scrolling is in progress and cannot be interrupted.
// html {
//   touch-action: none;
// }
.container {
  .drag {
    position: absolute;
  }
}
</style>
