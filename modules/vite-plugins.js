import { defineNuxtModule, addVitePlugin } from 'nuxt/kit'
import babel from 'vite-plugin-babel';
import svgLoader from 'vite-svg-loader'

export default defineNuxtModule({
    meta: {
        name: 'vite-plugins'
    },
    setup () {
        addVitePlugin(babel({
            babelConfig: {
                plugins: [
                    "@babel/plugin-transform-runtime",
                    "@babel/plugin-syntax-dynamic-import"
                ]
            }
        }))

        addVitePlugin(svgLoader())
    }
})
