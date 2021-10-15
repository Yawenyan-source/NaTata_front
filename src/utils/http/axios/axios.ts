import axios, { AxiosPromise, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import router from "../../../router";
import { MyAxiosResponse } from "../../../types/axios";

let base = ''
const instance = axios.create({
    timeout: 10000
});

/**
 * 请求拦截器
 */
instance.interceptors.request.use((config: any) => {
    //如果存在token,请求携带这个token
    const tokenStr = window.sessionStorage.getItem('tokenStr');
    if (tokenStr) {
        config.headers = {
            'Authorization': tokenStr,
            // 'Content-Type': 'application/x-www-form-urlencoded'
        }
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
instance.interceptors.response.use(
    (response: AxiosResponse<any>) => {
        // console.log(response);
        const statusCode = response.status;
        //业务逻辑错误,服务器正常,给出的错误码
        if (statusCode && statusCode === 200) {
            if (response.data.code === 500 ||
                response.data.code === 401 ||
                response.data.code === 403) {
                ElMessage.error({
                    message: response.data.message
                });
                return;
            }
            if (response.data.message) {
                ElMessage.success({
                    message: response.data.message
                })
            }
        }
        //返回成功的数据
        return response;
    }, (error: any) => {
        console.log(error.response);
        //服务器出现问题,状态码
        if (error.response.status === 504 ||
            error.response.status === 404) {
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
            if (error.response) {
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


/**
 * 创建json格式的post请求
 * @param url url地址
 * @param params 请求参数
 */
export const postRequest = (url: string, params: any): AxiosPromise<MyAxiosResponse> => {
    return instance.post(
        `${base}${url}`,
        params,
    )
}
/**
 * 创建json格式的get请求
 * @param url url地址
 * @param params 请求参数
 */
export const getRequest = (url: string, params: any): AxiosPromise<MyAxiosResponse> => {
    return instance.get(
        `${base}${url}`,
        params,
    )
}
/**
 * 创建json格式的put请求
 * @param url url地址
 * @param params 请求参数
 */
export const putRequest = (url: string, params: any): AxiosPromise<MyAxiosResponse> => {
    return instance.put(
        `${base}${url}`,
        params,
    )
}
/**
 * 创建json格式的delete请求
 * @param url url地址
 * @param params 请求参数
 */
export const deleteRequest = (url: string, params: any): AxiosPromise<MyAxiosResponse> => {
    return instance.delete(
        `${base}${url}`,
        params,
    )
}