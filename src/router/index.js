import Vue from 'vue';
import VueRouter from 'vue-router';
import Container from '../container/Container';

Vue.use(VueRouter);

const routes = [
  {
    path: '/api',
    name: 'Api管理',
    component: Container,
    icon: 'el-icon-film',
    children: [
      {
        path: '/',
        name: 'ApiPage',
        component: () => import('../views/Api'),
      },
      {
        path: '/detail',
        name: 'ApiDetailPage',
        component: () => import('../views/Api/ApiDetail'),
      },
      {
        path: '/edit',
        name: 'ApiEditPage',
        component: () => import('../views/Api/ApiEdit'),
      },
    ],
  },
  {
    path: '/apiTest',
    name: 'Api快速测试',
    component: Container,
    icon: 'el-icon-edit-outline',
    children: [
      {
        path: '/',
        name: 'TestPage',
        component: () => import('../views/Test'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
