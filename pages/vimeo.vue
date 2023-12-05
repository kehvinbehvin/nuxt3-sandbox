<template>
  <client-only>
    <vimeo-player ref="player" :video-id="videoID"/>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      videoID: "250383662",
      height: 500,
      options: {
        muted: true,
        autoplay: true,
      },
      playerReady: false
    }
  },
  methods: {
    onReady() {
      this.playerReady = true
    },
    play () {
      this.$refs.player.play()
    },
    pause () {
      this.$refs.player.pause()
    }
  }
}
</script>