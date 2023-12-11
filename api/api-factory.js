import postFactory from "./post"
import productFactory from "./product.js";

const apiFactory = (oFetchKit, config) => ({
    post: postFactory(oFetchKit, config),
    product: productFactory(oFetchKit, config)
});

export default apiFactory