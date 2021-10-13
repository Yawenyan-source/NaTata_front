import {RouteRecordRaw} from "vue-router";
//联合类型,拓展RouteRecordRaw
type RouteConfig = RouteRecordRaw & {hidden?: boolean}; //hidden 是可选属性
