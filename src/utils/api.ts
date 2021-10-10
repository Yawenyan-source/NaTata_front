import axios, {AxiosPromise} from "axios";
import {ElMessage} from "element-plus";
import {router} from "../routers"

/**
 * 请求拦截器
 */
axios.interceptors.request.use((config) => {
        //如果存在token,请求携带这个token
        if (window.sessionStorage.getItem('tokenStr')) {
            config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr')
        }
        return config
    }
    , error => {
        console.log(error);
    }
)
/**
 * 响应拦截器
 */
axios.interceptors.response.use(
    success => {
        //业务逻辑错误,服务器正常,给出的错误码
        if (success.status && success.status === 200) {
            if (success.data.code === 500 ||
                success.data.code === 401 ||
                success.data.code === 403) {
                ElMessage.error({
                    message: success.data.message
                });
                return;
            }
            if (success.data.message) {
                ElMessage.success({
                    message: success.data.message
                })
            }
        }
        //返回成功的数据
        return success.data;
    }, error => {
        //服务器出现问题,状态码
        if (error.response.code === 504 ||
            error.response.code === 404) {
            ElMessage.error({
                message: '服务器被吃了QAQ'
            })
        } else if (error.response.code === 403) {
            ElMessage.error({
                message: '权限不足,请联系管理员!!'
            })
        } else if (error.response.code === 401) {
            ElMessage.error({
                message: '尚未登录,请登录!!'
            })
            //跳转到登录页
            router.push('/').then()
        } else {
            if (error.response.data.message) {
                ElMessage.error({
                    message: error.response.data.message
                })
            } else {
                ElMessage.error({
                    message: '未知错误'
                })
            }
        }
    })

let base = ''
/**
 * 创送json格式的post请求
 * @param url
 * @param params
 * @returns {AxiosPromise}
 */
export const postRequest = (url: string, params: object): AxiosPromise => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}
/**
 * 传送json的put请求
 * @param url
 * @param params
 */
export const putRequest = (url: string, params: object): AxiosPromise => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}
/**
 * 传送json的get请求
 * @param url
 * @param params
 */
export const getRequest = (url: string, params: object): AxiosPromise => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}
/**
 * 传送json的delete请求
 * @param url
 * @param params
 */
export const deleteRequest = (url: string, params: object): AxiosPromise => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}