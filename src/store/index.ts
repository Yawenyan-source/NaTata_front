import {createStore, Store} from 'vuex'
import {InjectionKey} from "vue";

export interface State {
    routes: any
}



// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        routes: []
    },
    mutations: {
        initRouteList(state, data) {
            state.routes = data
        }
    },
    actions: {}
})

