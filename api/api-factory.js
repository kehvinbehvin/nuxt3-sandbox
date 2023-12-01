import postFactory from "./post"

const apiFactory = (oFetch, config) => ({
    post: postFactory(oFetch, config)
});

export default apiFactory