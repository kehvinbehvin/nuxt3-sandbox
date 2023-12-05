<template>
  <div>
    Hello world
    <p>{{$config.public.apiBase}}</p>
  </div>
  <template v-for="item in data" :key="item.id">
    <div>
      {{ item.id }}
    </div>
  </template>
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