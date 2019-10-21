import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './views/frame/login/Login.vue';
import Home from './views/Home.vue';
import NoDefund from './views/frame/404/404.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/menulist',
          name: 'menulist',
          component: () => import('./views/frame/userManager/MenuList.vue'),
        },
        {
          path: '/userlist',
          name: 'userlist',
          component: () => import('./views/frame/userManager/UserList.vue'),
        },
      ],
    },
    // 通配页，找不到就进入404页面，放在最后面
    {
      path: '/404',
      name: '404',
      component: NoDefund,
    },
  ],
  mode: 'history',
});

