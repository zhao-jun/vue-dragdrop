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
      console.log(e, position);
    },
    move(e, position) {
      console.log(position);
    },
    end(e, position) {
      console.log(position);
    }
  }
};
</script>
