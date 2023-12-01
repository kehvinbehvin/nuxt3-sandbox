// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
// @ts-ignore
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
  ]
})