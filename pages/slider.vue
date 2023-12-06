<template>
  <vue-slider v-model="data" />
  <h1>{{ data }}</h1>
</template>

<script>
export default {
  setup() {
    const data = ref(0)
    return {
      data
    }
  },
}
</script>