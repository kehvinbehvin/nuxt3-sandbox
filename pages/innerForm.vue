<template>
  <div ref="inner-firstName">
    First Name<input type="text" v-model="this.v$.firstName.$model" @blur="this.v$.firstName.$touch">
    {{this.firstName}}
    <p>This field is dirty {{ this.v$.firstName.$anyDirty }}</p>
    <p>This field is dirty {{ this.v$.firstName.$dirty }}</p>
    <p>This field should be invalid invalid {{ this.v$.firstName.$invalid }}</p>
    <p>This field should only show error after dirty and still invalid {{ this.v$.firstName.$error }}</p>
  </div>

  <div>
    Inner form entity
    <input type="text" v-model="this.entity.role" @blur="this.v$.entity.role.$touch">
    <p>This field is dirty {{ this.v$.entity.role.$anyDirty }}</p>
    <p>This field is dirty {{ this.v$.entity.role.$dirty }}</p>
    <p>This field should be invalid invalid {{ this.v$.entity.role.$invalid }}</p>
    <p>This field should only show error after dirty and still invalid {{ this.v$.entity.role.$error }}</p>
    <div v-if="this.entity.name">
      TRUE
    </div>
    <div v-else>
      FALSE
    </div>
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
  props: {
    entity: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      firstName: '',
    }
  },
  validations() {
    return {
      firstName: { required },
      entity: {
        name: {},
        role: {
          required
        }
      }
    }
  }
}
</script>