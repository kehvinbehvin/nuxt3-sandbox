const productFactory = ({oFetch, abortController}, config) => ({
	controller: null,
    async searchProduct(userInput, options) {
		if (this.controller !== null) {
			console.log("Aborting earlier request because of too many user requests")
			this.controller.abort("User requested too many times")
		}

		this.controller = new abortController() 
		const result = await oFetch(`https://dummyjson.com/products/search`, {
            method: "GET",
            signal: this.controller.signal,
            params: {
                q: userInput
            }
        })

		this.controller = null;
				
        return result    
	},
})

export default productFactory
