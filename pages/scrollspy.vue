<template>
  <ClientOnly fallback-tag="span" fallback="Loading comments...">
  <div class="container" >
    <div class="nav" v-scroll-spy-active v-scroll-spy-link>
      <a href="#1" class="link">Link 1</a>
      <a href="#2" class="link">Link 2</a>
      <a href="#3" class="link">Link 3</a>
      <a href="#4" class="link">Link 4</a>
    </div>
    <div class="scroll-container" v-scroll-spy="{ time: 300, offset: 25 }">
      <div id="1" class="sub-containers">Body 1</div>
      <div id="2" class="sub-containers">Body 2</div>
      <div id="3" class="sub-containers">Body 3</div>
      <div id="4" class="sub-containers">Body 4</div>
    </div>
  </div>
  </ClientOnly>
</template>
<script>
export default {
  setup() {
    console.log("Hello world")
  }
}
</script>
<style>
.container {
  height: 400px;
  width: 400px;
  background-color: #7ad9ff;
}

.nav {
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.active {
  color: red;
}

.sub-containers {
  height: 250px;
  width: 400px;
  background-color: antiquewhite;
}

.scroll-container {
  overflow: scroll;
  height: 100%;
  position: relative;
}
</style>