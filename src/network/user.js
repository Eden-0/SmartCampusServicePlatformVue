import {request} from "./request";
import Qs from 'qs'


export function getCaptchaNetwork(userName){
    return request({
        url: '/user/getCaptchaImg',
        method: 'post',
        data:{
            'idNumber': userName
        },
        responseType: "blob",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        // 在请求之前对data传参进行格式转换
        transformRequest: [function(data) {
            data = Qs.stringify(data)
            return data
        }]
    })
}

export function loginNetwork(userName, userPwd, captcha){
  return request({
    url: '/user/login',
      method:'post',
        data:{
            "idNumber": userName,
            "password": userPwd,
            "code":captcha
        }
  })
}

/**
 * {
 *   "queryType": 7,
 *   "userId": 1011,
 *   "idNumber": "123123"
 * }
 */
export function queryUserInfoNetwork(userId, idNumber){
    return request({
        url:'/user/userInfo',
        method: 'post',
        data:{
            queryType: 7,
            userId,
            idNumber
        }
    })
}

export function updateUserInfoNetwork(userId, phone, email, homeAddress) {
    return request({
        url:'/user/alterUserInfo',
        method: 'post',
        data:{
            userId,
            phone,
            email,
            homeAddress
        }
    })
}

