import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import TableHome from '../views/TableHome.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/nav',
    },
    {
      path: '/nav',
      name: 'nav',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NavG.vue'),
      children:[
        {
          path: '',
          name: 'tableHome',
          component: () => import('../views/TableHome.vue'),
        },
        
        {
          path: 'setting',
          name: 'setting',
          component: () => import('../views/Setting.vue'),
        },{
           path: 'tablehome',
          name: 'totableHome',
          component: () => import('../views/TableHome.vue'),
        }


      ]
    },{
      path: '/helloWorld',
      name: 'helloWorld',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/HelloWorld.vue'),

    }
  ],
})

export default router
