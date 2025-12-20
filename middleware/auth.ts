export default defineNuxtRouteMiddleware((to, from) => {
  const { checkAuth } = useAuth()
  
  // Check if user is authenticated
  const isAuthenticated = checkAuth()
  
  // If not authenticated and trying to access protected route
  if (!isAuthenticated && to.path === '/interviews') {
    return navigateTo('/login')
  }
  
  // If authenticated and trying to access login page
  if (isAuthenticated && to.path === '/login') {
    return navigateTo('/interviews')
  }
})
