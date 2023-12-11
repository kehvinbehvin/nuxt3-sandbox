import apiFactory from "../api/api-factory.js";

export default defineNuxtPlugin(nuxtApp => {
    const { $oFetch, $abortController } = nuxtApp
    const config = useRuntimeConfig()
    const oFetchKit = {
        oFetch: $oFetch,
        abortController: $abortController
    }
    return {
        provide: {
            api: apiFactory(oFetchKit, config)
        }
    }
})
