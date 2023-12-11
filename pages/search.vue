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

      controller: null,
    }
  },
  methods: {
    async userInputHandler(userInput) {
	  if (this.controller !== null) {
		console.log("ABORTING", this.controller.signal)
		this.controller.abort("User searching like mad")
	  }

      const { $abortController } = useNuxtApp();
      const controller = new $abortController() 
	  console.log("Searching")

      const { $api } = useNuxtApp()

      this.controller = controller
	  console.log("SIGNAL BEFORE:", controller.signal)

      this.results = await $api.product.searchProduct(userInput, {
        signal: controller.signal
      })
	  this.controller = null

	  console.log("SIGNAL COMPLETED: ")
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
