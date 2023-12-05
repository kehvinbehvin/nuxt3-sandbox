export default defineNuxtConfig({
    runtimeConfig: {
        // Private config that is only available on the server
        apiSecret: '123',
        // Config within public will be also exposed to the client
        public: {
            apiBase: 'https://jsonplaceholder.typicode.com'
        }
    },
    public: [
        '~/plugins/oFetch',
        '~/plugins/apiFactory',
        '~/plugins/clickAway',
    ],
    css: ["~/assets/styles/index.scss"],
    vite: {
        // Documentation in https://vitejs.dev/config/build-options#build-sourcemap
        // build: {
        //   sourcemap: false
        // },
        css: {
            preprocessorOptions: {
                scss: {
                    // Syntax suggested here https://stackoverflow.com/questions/68131954/how-to-use-sass-using-in-vuejs3-vite
                    additionalData: '@import "~/assets/styles/variables"; @import "~/assets/styles/mixins";'
                },
            },
        },
    },
})