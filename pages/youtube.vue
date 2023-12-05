<template>
  <div>
    <YouTube
        src="https://www.youtube.com/watch?v=jNQXAC9IVRw"
        @ready="onReady"
        ref="youtube" />
  </div>
</template>

<script>
import YouTube from "vue3-youtube";

export default {
 components: {
   YouTube,
 },
  methods: {
    onReady() {
      this.$refs.youtube.playVideo()
    }
  },
  data() {
   return {
     source: "https://www.youtube.com/watch?v=jNQXAC9IVRw"
   }
  }
}
</script>