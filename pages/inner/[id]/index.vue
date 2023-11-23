<template>
 <div>
   Hi
 </div>
</template>

<script>
export default {
  async setup() {
    const { $api } = useNuxtApp()
    const route = useRouter()
    const currentRoute = useRoute()
    // Examples of using both composables.
    console.log("current route", currentRoute.params.id)
    console.log("route", route.currentRoute.value.params.id)
    const { data, refresh } = await useAsyncData("posts", () => $api.post.getPost(route.params.id))

    return {
      data
    }
  }
}
</script>