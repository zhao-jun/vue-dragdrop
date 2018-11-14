<template>
  <div :class="$style.container">
    <div
      :class="`${$style.drag} ${cellRef}-${index}`"
      v-for="(item, index) in styleObject"
      :key="index"
      :ref="`${cellRef}-${index}`"
      :style="item"
      :data-index="index"
      @mousedown.prevent.stop="start"
      @touchstart.prevent.stop="start"
      @mousemove.prevent.stop="move"
      @touchmove.prevent.stop="move"
      @mouseup.prevent.stop="end"
      @touchend.prevent.stop="end"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "vue-dragdrop",
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
      default: true
    }
  },
  data() {
    return {
      changingDom: [],
      currMove: "",
      position: []
    };
  },
  methods: {
    start(e) {
      if (e.touches.length > 1 && !this.mutiTouch) return false;
      let dataIndex = e.target.dataset.index;
      let touch = [...e.touches].filter(
        i => i.target.dataset.index == dataIndex
      )[0];
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
      if (
        (e.touches.length > 1 || this.currMove !== e.target) &&
        !this.mutiTouch
      )
        return false;
      let dataIndex = e.target.dataset.index;
      let touch = [...e.touches].filter(
        i => i.target.dataset.index == dataIndex
      )[0];

      let moveX = touch.pageX - this.position[dataIndex].x;
      let moveY = touch.pageY - this.position[dataIndex].y;
      e.target.style.left =
        parseFloat(this.position[dataIndex].left) + moveX + "px";
      e.target.style.top =
        parseFloat(this.position[dataIndex].top) + moveY + "px";
      this.$emit("move", e, {
        top: e.target.style.top,
        left: e.target.style.left,
        x: touch.pageX,
        y: touch.pageY
      });
    },
    end(e) {
      if (e.target !== this.currMove && !this.mutiTouch) return false;
      let dataIndex = e.target.dataset.index;
      let touch = [...e.changedTouches].filter(
        i => i.target.dataset.index == dataIndex
      )[0];

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
