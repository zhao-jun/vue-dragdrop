<template>
  <drag-drop @end="end" />
</template>

<script>
import DragDrop from "./components/drag-drop";

export default {
  name: "app",
  components: {
    DragDrop
  },
  methods: {
    end() {}
  }
};
</script>
