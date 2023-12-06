<script>
import { useChallengeV2 } from 'vue-recaptcha'

export default {
  setup() {
    const { root, execute, onVerify, state, widgetID } = useChallengeV2({
      options: {
        // It's important to pass `size: 'invisible'` to render a invisible reCAPTCHA
        size: 'invisible',
      }
    })

    onVerify((response) => {
      // do something with response
      console.log(response)
    })

    return {
      root,
      execute,
      state,
      widgetID
    }
  }
}

</script>

<template>
  <div>
    <button @click="execute">submit</button>
    <!-- You must give an empty div to render the invisible reCAPTCHA -->
    <div ref="root" />
    <div>State: {{ state }}</div>
    <div>WidgetID: {{ widgetID }}</div>
  </div>
</template>

