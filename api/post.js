const postFactory = ({oFetch, abortController}, config) => ({
    getPost(id) {
        return oFetch(`${config.public.apiBase}/posts/${id}`, {
            method: "GET",
            signal: abortController.signal
        })
    },
    getPosts() {
        return oFetch(`${config.public.apiBase}/posts`, {
            method: "GET",
            signal: abortController.signal
        })
    }
})

export default postFactory