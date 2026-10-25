import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/HomeView.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component:()=>import('@/views/About.vue')
        },
        {
      path: '/list',
      name: 'list',
      component: () => import('@/views/ProductList.vue')
    },
    {
      path: '/detail/:id',
      // 懒加载，访问这个路由才加载ProductDetail组件
      component: () => import('@/views/ProductDetail.vue')
    }
    ]
})
export default router