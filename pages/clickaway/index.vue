<template>
  <div class="container" v-click-away="onClickAway">
    Dropdown {{ count }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    onClickAway(event) {
      console.log(event)
      this.count++
    }
  }
}
</script>

<style>
.container {
  height: 200px;
  width:200px;
  background-color: green;
}
</style>