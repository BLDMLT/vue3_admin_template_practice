// 对外暴露的路由 (常量路由)
export const constantRoute = [
  // /login
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', // 命名路由
    meta: {
      title: '登录', // 菜单标题
      hidden: true, // 隐藏标题
      icon: 'Promotion',
    },
  },
  // / home
  {
    // 登录后展示
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout', // 命名路由
    meta: {
      title: 'layout',
      hidden: false,
      icon: 'Avatar',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    // 数据展示
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen', // 命名路由
    meta: {
      title: '数据大屏', // 菜单标题
      hidden: false, // 隐藏标题
      icon: 'DataBoard',
    },
  },
  // 404
  {
    // 登录后展示
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404', // 命名路由
    meta: {
      title: '404', // 菜单标题
      hidden: true, // 隐藏标题
      icon: 'HomeFilled',
    },
  },
  // any
  {
    // 登录
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any', // 命名路由
    meta: {
      title: 'Any', // 菜单标题
      hidden: true, // 隐藏标题
      icon: 'HomeFilled',
    },
  },
]
