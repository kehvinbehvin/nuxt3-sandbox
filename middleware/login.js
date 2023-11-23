export default defineNuxtRouteMiddleware((to, from) => {
    console.log("[middleware] login: From", from.path, "-> To", to.path)
})
