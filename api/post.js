const postFactory = (oFetch, config) => ({
    getPost(id) {
        return oFetch(`${config.public.apiBase}/posts/${id}`, {
            method: "GET"
        })
    },
    getPosts() {
        return oFetch(`${config.public.apiBase}/posts`, {
            method: "GET"
        })
    }
})

export default postFactory