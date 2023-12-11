const productFactory = ({oFetch, abortController}, config) => ({
    searchProduct(userInput, options) {
        return oFetch(`https://dummyjson.com/products/search`, {
            method: "GET",
            signal: options.signal,
            params: {
                q: userInput
            }
        })
    },
})

export default productFactory