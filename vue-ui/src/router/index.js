/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/LoginView'
import SignUp from '@/views/SignUpView'
import Projects from '@/views/ProjectsView'
import Project from '@/views/ProjectView'
import Logout from '@/views/LogoutView'
import ProjectForm from '@/views/ProjectFormView'
import UserAccountView from '@/views/UserAccountView'

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
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/project/:project_id',
      name: 'Project',
      component: Project
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/addproject',
      name: 'ProjectForm',
      component: ProjectForm
  },
  {
      path: '/editproject/:project_id',
      name: 'ProjectEditForm',
      component: ProjectForm
  },
  {
      path: '/user',
      name: 'UserAccountView',
      component: UserAccountView
  }
  ]
})
