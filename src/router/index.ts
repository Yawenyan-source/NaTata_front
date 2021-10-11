import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: {
            hasSubMenu: false
        }
    },
    {
        path: "/home",
        name: '导航1',
        component: () => import('../views/Home.vue'),
        meta: {
            hasSubMenu: true
        },
        children: [
            {
                path: "/test1",
                name: '选项1',
                component: () => import('../views/Test1.vue')
            },
            {
                path: "/test2",
                name: '选项2',
                component: () => import('../views/Test2.vue')
            }
        ]
    }
]
const router = createRouter(
    {
        routes: routes,
        history: createWebHistory()
    }
);
export default router


