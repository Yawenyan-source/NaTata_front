import {getRequest} from "../http/axios/axios";
import {Router} from "vue-router";
import {Store} from "vuex";

export const initMenu = (router: Router, store: Store<any>) => {
    if (store.state.routes.length > 0) {
        return;
    }
    //获取菜单数据的Api
    getRequest('/api/system/cfg/menu', null).then(menuData => {
        //如果存在菜单数据,则处理
        if (menuData) {
            //处理获得的菜单数据
            const data = menuData.data
            const menuRouters = formatMenuData(data)
            menuRouters?.forEach(menuRouter => {
                router.addRoute(menuRouter)
            })
            store.commit('initRouteList', menuRouters)
            //将数据存入vuex

        }
    })
}
export const formatMenuData = (routers: any) => {
    // console.log(routers);
    if (!routers) {
        return
    }
    let menuRouter: any[] = []
    routers.forEach((router: any) => {
        let {
            path,
            component,
            name,
            iconCls,
            children
        } = router //批量变量定义 相当于 let path =  router.path;...
        if (children && children instanceof Array) {
            //递归c
            children = formatMenuData(children);
        }
        if (component.startsWith('Home')) {
            let temp = {
                path: path,
                name: name,
                meta: {
                    iconCls: iconCls
                },
                component: () => import(`../../views/${component}.vue`),
                children: children
            }
            menuRouter.push(temp)
        } else if (component.startsWith('Emp')) {
            let temp = {
                path: path,
                name: name,
                meta: {
                    iconCls: iconCls
                },
                component: () => import(`../../views/emp/${component}.vue`),
                children: children
            }
            menuRouter.push(temp)
        } else if (component.startsWith('Per')) {
            let temp = {
                path: path,
                name: name,
                meta: {
                    iconCls: iconCls
                },
                component: () => import(`../../views/per/${component}.vue`),
                children: children
            }
            menuRouter.push(temp)
        } else if (component.startsWith('Sal')) {
            let temp = {
                path: path,
                name: name,
                meta: {
                    iconCls: iconCls
                },
                component: () => import(`../../views/sal/${component}.vue`),
                children: children
            }
            menuRouter.push(temp)
        } else if (component.startsWith('Sta')) {
            let temp = {
                path: path,
                name: name,
                meta: {
                    iconCls: iconCls
                },
                component: () => import(`../../views/sta/${component}.vue`),
                children: children
            }
            menuRouter.push(temp)
        } else if (component.startsWith('Sys')) {
            let temp = {
                path: path,
                name: name,
                meta: {
                    iconCls: iconCls
                },
                component: () => import(`../../views/sys/${component}.vue`),
                children: children
            }
            menuRouter.push(temp)
        }
    })
    console.log(menuRouter);
    return menuRouter;
}
