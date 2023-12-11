<template>
  <input @input="debounceUserInput" placeholder="Search products..." />
  <div v-for="item in results.products">
   <p>{{ item.title }}</p>
  </div>
</template>
<script>
import debounce from "../utils/debounce.js";

export default {
  data() {
    return {
      results: {},
      userInput: "",
    }
  },
  methods: {
    async userInputHandler(userInput) {
      const { $api } = useNuxtApp()
	  try {
		this.results = await $api.product.searchProduct(userInput)
	  } catch (error) {
		console.log(error)
	  }
    },
    debounceUserInput(e) {
      console.log("Debouncing", e.target.value)
      debounce(this.userInputHandler(e.target.value), 300)
    },
    testHandler(e) {
      console.log("Test")
    }
  },
  computed: {
    input() {
      console.log(this.userInput)
    }
  }
}
</script>
