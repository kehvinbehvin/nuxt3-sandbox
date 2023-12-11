import {ofetch, AbortController} from 'ofetch'

export default defineNuxtPlugin(nuxtApp => {
    const instance = ofetch.create({
        onRequest(context) {
            console.log("[onRequest] oFetch plugin: ", context.request)
        },
        onResponse(context) {
            console.log("[onResponse] oFetch plugin: ", context.error)
        },
        onResponseError(context) {
            console.log("[onResponseError] oFetch plugin: ", context.response)
        }
    })

    return {
        provide: {
            oFetch: instance,
            abortController: AbortController,
        }
    }
})