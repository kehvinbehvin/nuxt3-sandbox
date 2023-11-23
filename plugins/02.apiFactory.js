import apiFactory from "../api/api-factory.js";

export default defineNuxtPlugin(nuxtApp => {
    const { $oFetch } = nuxtApp

    return {
        provide: {
            api: apiFactory($oFetch)
        }
    }
})
