import {createApp} from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'font-awesome/css/font-awesome.css'
import router from "./router";
import {key, store} from "./store";
import {initMenu} from "./utils/menu/menus";


const LOGIN_PAGE_NAME = 'Login'
router.beforeEach((to, from, next) => {
    // 如果没有登录而且前往的页面不是登录页面，跳转到登录页
    if (to.name !== LOGIN_PAGE_NAME && !(window.sessionStorage.getItem('tokenStr'))) {
        next({name: LOGIN_PAGE_NAME})
    } else if (to.name === LOGIN_PAGE_NAME && !(window.sessionStorage.getItem('tokenStr'))) {
        // 如果没有登录而且前往的页面是登录页面，跳转到登录页面
        // 这里有一个坑，一定要注意这一步和上一步得分开写
        // 则会形成登录页面无限刷新的错误，具体成因后面解释
        next()
    } else {
        initMenu(router, store)
        next();
    }

})

const app = createApp(App);
app.use(ElementPlus)
app.use(router)
app.use(store, key)
app.mount('#app')
