<template>
  <vue-drag
    ref="drag"
    @start="onStart"
    @move="onMove"
    @end="onEnd"
    :styleList="styleList"
    :mutiTouch="true"
    :changingDom="changingDom"
    :htmlList="htmlList"
  />
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      styleList: [
        {
          left: "50px",
          top: "50px",
          width: "50px",
          height: "50px",
          backgroundColor: "yellow",
          zIndex: 0
        },
        {
          left: "50px",
          top: "150px",
          width: "50px",
          height: "50px",
          backgroundColor: "aqua",
          zIndex: 0
        }
      ],
      htmlList: ["drag", "drop"],
      changingDom: []
    };
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
          { transition: "all .5s ease-in-out" }
        );
      }
      if (dataIndex == 1) {
        this.animation(
          e,
          { left: "50px", top: "150px" },
          { transition: "all .5s ease-in-out" }
        );
      }
    },
    animation(e, position, transition) {
      e.target.style.transition = transition.transition;
      this.changingDom.push(e.target);
      e.target.style.left = position.left;
      e.target.style.top = position.top;
      setTimeout(() => {
        e.target.style.transition = null;
        this.changingDom = this.changingDom.filter(i => i !== e.target);
      }, 500);
    }
  }
};
</script>
