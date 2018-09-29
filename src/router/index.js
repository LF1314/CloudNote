import Vue from 'vue'
import Router from 'vue-router'
import index from '@views/index'
import login from '@views/login'
import write from '@views/write'
import read from '@views/readarticle'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/write',
      name: 'write',
      component: write
    },
    {
      path: '/read',
      name: 'read',
      component: read
    }


  ]
})
