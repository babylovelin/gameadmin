import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import Functions from '@/components/Functions'
import Personal from '@/components/Personal'
import Playercharge from '@/components/Playercharge'
import Chargeforcards from '@/components/Chargeforcards'
import Register from '@/components/Register'
import Login from '@/components/Login'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Main',
      component: Main,
      children: [{
          path: '/functions',
          name: 'Functions',
          component: Functions
        }, {
          path: '/personal',
          name: 'Personal',
          component: Personal
        },
        {
          path: '/playercharge',
          name: 'Playercharge',
          component: Playercharge
        },
        {
          path: '/chargeforcards',
          name: 'Chargeforcards',
          component: Chargeforcards
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})