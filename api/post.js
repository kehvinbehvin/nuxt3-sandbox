const postFactory = (oFetch) => ({
    getPost(id) {
        return oFetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "GET"
        })
    },
    getPosts() {
        return oFetch("https://jsonplaceholder.typicode.com/posts", {
            method: "GET"
        })
    }
})

export default postFactory