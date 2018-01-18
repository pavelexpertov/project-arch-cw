import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/views/HelloWorldView'
import Login from '@/views/LoginView'
import SignUp from '@/views/SignUpView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePageLogin',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
