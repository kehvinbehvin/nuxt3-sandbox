<template>
  <div>
    Hello world
  </div>
  <div v-for="item in data">
    <div>
      {{ item.id }}
    </div>
  </div>
</template>

<script>
export default {
  async setup() {
    const { $api } = useNuxtApp()
    const { data, refresh } = await useAsyncData("posts", $api.post.getPosts)
    return {
      data
    }
  }
}
</script>