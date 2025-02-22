import axios from 'axios'
import {REQUESTAPIURL} from "@/config";
import {getCookie} from "@/util/cookie";

axios.defaults.withCredentials = true

/**
 *
 *
 * 如果是formdata参数，请在请求参数再加上
 *         headers: {
 *             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
 *         },
 *         // 在请求之前对data传参进行格式转换
 *         transformRequest: [function(data) {
 *             data = Qs.stringify(data)
 *             return data
 *         }]
 *
 *
 */

/**
 * 网络请求方法
 * @param config
 * @returns {AxiosPromise}
 */
export function request(config) {

  let baseURL = REQUESTAPIURL

  const instance = axios.create({
      headers:{"Authorization":getCookie('token')},
    baseURL: baseURL,
    timeout: 10000,
      contentType: "application/json; charset=utf-8",
      withCredentials:true
  })

  /*
    拦截器，只返回请求的data
  */
  instance.interceptors.response.use(
      (res) => {
          console.log(res)
          let result = res.data
          if(result.code !== 200)
              result.msg = decodeURI(result.msg)
          return result
      },
      (error) => {
        console.log(error)
        if(error.response!==null && 500 === error.response.status){
          window.open(baseURL+ '/error')
        }
      })
  return instance(config)
}
