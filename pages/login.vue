<template>
  <div>
    Login
  </div>
</template>

<script>
export default {
  async setup() {
    definePageMeta({
      middleware: [
        'login',
      ],
    });
  }
}
</script>