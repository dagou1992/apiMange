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
        path: '/api/detail',
        name: 'ApiDetailPage',
        component: () => import('../views/Api/ApiDetail'),
      },
      {
        path: '/api/edit',
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
  {
    path: '/Common',
    name: '公共资源管理',
    component: Container,
    icon: 'el-icon-menu',
    children: [
      {
        path: '/Common/env',
        name: '环境配置',
        onSide: true,
        icon: 'el-icon-s-tools',
        component: () => import('../views/Common/Env'),
      },
      {
        path: '/Common/dataStructure',
        name: '数据结构',
        onSide: true,
        icon: 'el-icon-s-tools',
        component: () => import('../views/Common/DataStructure'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
