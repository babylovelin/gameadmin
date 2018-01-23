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
import Wxpayresult from '@/components/Wxpayresult'
import Chargeforplayer from '@/components/Chargefroplayer'
import Resetpassword from '@/components/Resetpassword'
import Changepassword from '@/components/Changepassword'
import Playerrecord from '@/components/PlayerRecord'
import Proxyrecord from '@/components/Proxyrecord'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Main',
      component: Main,
      children: [{
          path: '/',
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
        },
        {
          path: '/wxpayresult',
          name: 'Wxpayresult',
          component: Wxpayresult
        },
        {
          path: '/chargeforplayer/:chargecardnum',
          name: 'Chargeforplayer',
          component: Chargeforplayer
        },
        {
          path: '/resetpassword',
          name: 'Resetpassword',
          component: Resetpassword
        },
        {
          path: '/changepassword',
          name: 'Changepassword',
          component: Changepassword
        },
        {
          path: '/playerrecord',
          name: 'Playerrecord',
          component: Playerrecord
        },
        {
          path: '/proxyrecord',
          name: 'proxyrecord',
          component: Proxyrecord
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