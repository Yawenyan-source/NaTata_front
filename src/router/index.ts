import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw} from "vue-router";

import Login from '../views/Login.vue'

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: 'Login',
        component: Login,
        meta: {
            hidden: false,
        }
    },
    {
        path: "/home",
        name: '导航1',
        component: () => import('../views/Home.vue'),
        meta: {
            hidden: true,
        },
        children: [
            {
                path: "/test1",
                name: '选项1',
                meta: {
                    hidden: false,
                },
                component: () => import('../views/Test1.vue')
            },
            {
                path: "/test2",
                name: '选项2',
                meta: {
                    hidden: false,
                },
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






