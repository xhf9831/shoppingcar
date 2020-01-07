import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import common from '../components/Common'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: common,
        children: [{
            path: '',
            name: 'home',
            component: Home
        }]
    },
    {
        path: '/category',
        component: common,
        children: [{
            path: '',
            name: 'category',
            component: () =>
                import ('../views/category/Category')
        }]
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login/Login')
    },
    {
        path: '/shopcar',
        component: common,
        children: [{
            path: '',
            name: 'shopcar',
            component: () =>
                import ('../views/shopcar/Shopcar')
        }]
    },
    {
        path: '/mine',
        component: common,
        children: [{
            path: '',
            name: 'mine',
            component: () =>
                import ('../views/mine/Mine')
        }]
    },
    {
        path: '/malldetail',
        name: 'malldetail',
        component: () =>
            import ('../views/malldetail/Malldetail')
    },
    {
        path: '/collection',
        name: 'collection',
        component: () =>
            import ('../views/collection/Collection')
    },
    {
        path: '/addresslist',
        name: 'addresslist',
        component: () =>
            import ('../views/addresslist/Addresslist')
    },
    {
        path: '/editaddress',
        name: 'editaddress',
        component: () =>
            import ('../views/editaddress/Editaddress')
    },
    {
        path: '/city',
        name: 'city',
        component: () =>
            import ('../views/city/City')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router