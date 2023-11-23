<template>
  <div>
    Login
  </div>
  <Card />
</template>

<script>
import Card from "../components/card.vue"

export default {
  components:{
    Card
  },
  async setup() {
    definePageMeta({
      middleware: [
        'login',
      ],
    });
  }
}
</script>