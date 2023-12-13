<template>
  <div>
    "First Name"<input type="text" v-model="this.firstName">
  </div>
  <div>
    "Last Name"<input type="text" v-model="this.lastName">
  </div>
  <div>
    "Email"<input type="text" v-model="this.contact.email">
  </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      contact: {
        email: ''
      }
    }
  },
  validations () {
    return {
      firstName: { required },
      lastName: { required },
      contact: {
        email: { required, email }
      }
    }
  }
}
</script>