import Vue from 'vue'
import VueRouter from 'vue-router'

import StartPage from '../views/AppStartPage'
import ModuleWorkflow from '../views/ModuleWorkflow'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage
    },
    {
      path: '/course',
      name: 'Module',
      component: ModuleWorkflow
    }
  ]
})

export default router
