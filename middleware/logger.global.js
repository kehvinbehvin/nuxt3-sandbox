export default defineNuxtRouteMiddleware((to, from) => {
   console.log("[middleware] logger: From", from.path, "-> To", to.path)
})
