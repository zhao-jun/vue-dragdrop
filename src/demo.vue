<template>
  <div>
    <h2>基本使用</h2>
    <pre>&lt;vue-drag &gt;</pre>
    <div
      style="height: 300px; border: 1px solid blue; margin: 10px; position: relative;"
    >
      <vue-drag />
    </div>
    <h2>父元素位置限制</h2>
    <pre>&lt;vue-drag :limited="true" &gt;</pre>
    <div
      style="height: 300px; border: 1px solid blue; margin: 10px; position: relative;"
    >
      <vue-drag :limited="true" />
    </div>
    <h2>多个拖放元素</h2>
    <pre>&lt;vue-drag ref="drag" :styleList="styleList" :mutiTouch="true" :htmlList="htmlList"&gt;</pre>
    <div
      style="height: 300px; border: 1px solid blue; margin: 10px; position: relative;"
    >
      <vue-drag
        ref="drag"
        :styleList="styleList"
        :mutiTouch="true"
        :htmlList="htmlList"
      />
    </div>
    <h2>多个拖放元素，结束返回原位</h2>
    <pre>&lt;vue-drag ref="drag" @end="onEnd" :styleList="styleList" :mutiTouch="true" :htmlList="htmlList"&gt;</pre>
    <div
      style="height: 300px; border: 1px solid blue; margin: 10px; position: relative;"
    >
      <vue-drag
        ref="drag"
        @start="onStart"
        @move="onMove"
        @end="onEnd"
        :styleList="styleList"
        :mutiTouch="true"
        :htmlList="htmlList"
      />
    </div>
    <h2>多个拖放元素，父元素位置限制，结束返回原位</h2>
    <pre>&lt;vue-drag ref="drag" @end="onEnd" :styleList="styleList" :limited="true" :mutiTouch="true" :htmlList="htmlList"&gt;</pre>
    <div
      style="height: 300px; border: 1px solid blue; margin: 10px; position: relative;"
    >
      <vue-drag
        ref="drag"
        @start="onStart"
        @move="onMove"
        @end="onEnd"
        :styleList="styleList"
        :limited="true"
        :mutiTouch="true"
        :htmlList="htmlList"
      />
    </div>
  </div>
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
          left: "150px",
          top: "50px",
          width: "50px",
          height: "50px",
          backgroundColor: "aqua",
          zIndex: 0
        }
      ],
      htmlList: ["drag", "drop"]
    };
  },
  mounted() {},
  methods: {
    onStart(e) {},
    onMove(e, position) {},
    onEnd(e, position, animation) {
      let dataIndex = e.target.dataset.index;
      animation(e, this.styleList[dataIndex], {
        duration: "500",
        easing: "ease-in-out"
      });
    }
  }
};
</script>

<style lang="less" scoped>
pre {
  white-space: pre-wrap;
}
</style>
