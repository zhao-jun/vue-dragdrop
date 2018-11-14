<template>
  <drag-drop ref="drag" @start="onStart" @move="onMove" @end="onEnd" />
</template>

<script>
import DragDrop from "./components/drag-drop";

export default {
  name: "app",
  components: {
    DragDrop
  },
  mounted() {},
  methods: {
    onStart(e) {},
    onMove(e, position) {},
    onEnd(e, position) {
      let dataIndex = e.target.dataset.index;
      if (dataIndex == 0) {
        this.animation(
          e,
          { left: "50px", top: "50px" },
          { transition: "all .3s ease-in-out" }
        );
      }
      if (dataIndex == 1) {
        this.animation(
          e,
          { left: "50px", top: "150px" },
          { transition: "all .3s ease-in-out" }
        );
      }
    },
    animation(e, position, transition) {
      e.target.style.transition = transition.transition;
      e.target.style.left = position.left;
      e.target.style.top = position.top;
      setTimeout(() => {
        e.target.style.transition = null;
      }, 300);
    }
  }
};
</script>
