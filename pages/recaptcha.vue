<template>
  <div>
    <ThemeButton v-model="theme" @click="response = ''" />
    <div>{{ response ? 'Verified' : 'Please click the checkbox' }}</div>
    <RecaptchaCheckbox :key="theme" v-model="response" :theme="theme" />
  </div>
</template>

<script>
export default {
  setup() {
    const theme = ref<'light' | 'dark'>('light')
    const response = ref()

    return {
      theme,
      response
    }
  }
}

</script>
