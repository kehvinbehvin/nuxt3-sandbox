import apiFactory from "../api/api-factory.js";

export default defineNuxtPlugin(nuxtApp => {
    const { $oFetch } = nuxtApp
    const config = useRuntimeConfig()

    return {
        provide: {
            api: apiFactory($oFetch, config)
        }
    }
})
