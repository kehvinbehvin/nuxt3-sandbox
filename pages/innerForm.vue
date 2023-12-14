<template>
  <div ref="inner-firstName">
    First Name<input type="text" v-model="this.v$.firstName.$model" @blur="this.v$.firstName.$touch">
    {{this.firstName}}
    <p>This field is dirty {{ this.v$.firstName.$anyDirty }}</p>
    <p>This field is dirty {{ this.v$.firstName.$dirty }}</p>
    <p>This field should be invalid invalid {{ this.v$.firstName.$invalid }}</p>
    <p>This field should only show error after dirty and still invalid {{ this.v$.firstName.$error }}</p>
  </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import validations from "../mixins/validations.js";

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  mixins: [
    validations
  ],
  data() {
    return {
      firstName: '',
    }
  },
  validations() {
    return {
      firstName: { required }
    }
  }
}
</script>