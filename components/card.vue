<template>
  <div>
    Card {{ post.id }}
  </div>
</template>

<script>
export default {
  async mounted() {
    const { $api } = useNuxtApp()
    this.post = await $api.post.getPost("1")
    console.log("[mounted] Card: ", this.post)
  },
  data() {
    return {
      post: {}
    }
  }
}
</script>