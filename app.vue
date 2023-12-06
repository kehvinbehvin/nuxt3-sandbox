<template>
  <div>
    <Suspense>
      <NuxtPage />
    </Suspense>
  </div>
</template>
<script setup>
import { useRecaptchaProvider } from 'vue-recaptcha'

useRecaptchaProvider()
</script>