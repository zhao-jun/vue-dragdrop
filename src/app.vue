<template>
  <drag-drop ref="drag" @start="start" @move="move" @end="end" />
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
    start(e, position) {
      // console.log(e, position);
    },
    move(e, position) {
      // console.log(position);
    },
    end(e, position) {
      // console.log(position);
      this.animation(e);
    },
    animation(e, position, transition) {
      let dataIndex = e.target.dataset.index;
      e.target.style.transition = "all .3s ease-in-out";
      if (dataIndex == 0) {
        e.target.style.left = "50px";
        e.target.style.top = "50px";
      } else {
        e.target.style.left = "50px";
        e.target.style.top = "150px";
      }

      setTimeout(() => {
        e.target.style.transition = null;
      }, 300);
    }
  }
};
</script>
