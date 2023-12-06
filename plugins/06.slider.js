// @See https://github.com/NightCatSama/vue-slider-component/issues/114#issuecomment-353827607.
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'

// import theme
import 'vue-slider-component/theme/default.css'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('vue-slider', VueSlider);
})
