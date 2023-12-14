<template>
  <div ref="firstName">
    First Name<input type="text" v-model="this.v$.firstName.$model" @input="logger" @blur="this.v$.firstName.$touch">
    {{this.firstName}}
    <p>This field is dirty {{ this.v$.firstName.$anyDirty }}</p>
    <p>This field is dirty {{ this.v$.firstName.$dirty }}</p>
    <p>This field should be invalid invalid {{ this.v$.firstName.$invalid }}</p>
    <p>This field should only show error after dirty and still invalid {{ this.v$.firstName.$error }}</p>
  </div>
  <div ref="lastName">
    Last Name<input type="text" v-model="this.lastName" @blur="this.v$.lastName.$touch">
    {{this.lastName}}
    <p>This field is dirty {{ this.v$.lastName.$anyDirty }}</p>
    <p>This field should be invalid invalid {{ this.v$.lastName.$invalid }}</p>
    <p>This field should only show error after dirty and still invalid {{ this.v$.lastName.$error }}</p>
  </div>
  <div ref="email">
    Email<input type="text" v-model="this.contact.email" @blur="this.v$.contact.email.$touch">
    {{this.contact.email}}
    <p>This field is dirty {{ this.v$.contact.email.$anyDirty }}</p>
    <p>This field should be invalid invalid {{ this.v$.contact.email.$invalid }}</p>
    <p>This field should only show error after dirty and still invalid {{ this.v$.contact.email.$error }}</p>
  </div>
  <inner-form ref="inner-form" />
  <div @click="submit">
    Submit
  </div>
  <div @click="reset">
    Reset
  </div>
  <div @click="checkDirt">
    isDirty? {{ this.dusty }}
  </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import InnerForm from "./innerForm.vue";
import validations from "../mixins/validations.js";

export default {
  components: {
    InnerForm
  },
  mixins: [
    validations
  ],
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      contact: {
        email: ''
      },

      // None validation
      dusty: false,
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
  },
  methods: {
    logger() {
      console.log("V$: ", this.v$.firstName)
      console.log("Refs: ", this.$refs)
    },
    submit() {
      console.log("Calling mixin", this.isValid())
    },
    reset() {
      console.log("Calling reset")
      this.resetDirty()
    },
    checkDirt() {
      console.log("Checking all dirty, will be true as long 1 is dirty")
      this.dusty = this.isDirty()
    }
  }
}
</script>