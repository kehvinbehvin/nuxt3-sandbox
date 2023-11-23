import postFactory from "./post"

const apiFactory = (oFetch) => ({
    post: postFactory(oFetch)
});

export default apiFactory