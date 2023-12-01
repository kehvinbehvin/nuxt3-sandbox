<template>
  <div>
    Hello world
    <p>{{$config.public.apiBase}}</p>
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
    const { $api, $config } = useNuxtApp()
    const config = useRuntimeConfig();
    console.log("INDEX", config.public.apiBase)

    console.log("THIS INDEX", $config.public.apiBase)
    const { data, refresh } = await useAsyncData("posts", $api.post.getPosts)
    return {
      data
    }
  }
}
</script>