// https://nuxt.com/docs/api/components/client-only
// https://github.com/bennyxguo/vue3-scroll-spy/issues/2
import { registerScrollSpy, Easing } from 'vue3-scroll-spy';

export default defineNuxtPlugin((nuxtApp) => {
    registerScrollSpy(nuxtApp.vueApp, {
        easing: Easing.Cubic.In,
    })
})
