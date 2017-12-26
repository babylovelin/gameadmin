import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Functions from '@/components/Functions'
import Personal from '@/components/Personal'
import Playercharge from '@/components/Playercharge'
import Chargeforcards from '@/components/Chargeforcards'


Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'Functions',
      component: Functions
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
    },{
      path: '/playercharge',
      name: 'Playercharge',
      component: Playercharge
    },{
      path: '/chargeforcards',
      name: 'Chargeforcards',
      component: Chargeforcards
    },
  ]
})
