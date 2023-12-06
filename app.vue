<template>
  <div>
    <Suspense>
      <NuxtPage />
    </Suspense>
  </div>
</template>
<script>
import { useRecaptchaProvider } from 'vue-recaptcha'

export default {
  setup() {
    useRecaptchaProvider()
  }
}
</script>