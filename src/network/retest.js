import {request} from "./request";
import Qs from 'qs'

export function queryUserUnPassCourse(userId, courseID,testType,status){
	//查询用户未通过的课程的课程名称
    return request({
        url:'/courseRecord/queryUserUnPassCourse',
        method: 'post',
        data:{
            userId,
			courseID,
        }
    })
}

export function createReTest(userId, courseID,testType,status){
	//生成补考信息
    return request({
        url:'/test/createReTest',
        method: 'post',
        data:{
            userId,
			courseID,
        }
    })
}

export function conditionPageQuery(userId, courseID,testType,status){
	//条件查询考试，此处为查询用户的某课程id对应的补考考试
    return request({
        url:'/userTestRecord/conditionPageQuery',
        method: 'post',
        data:{
            userId,
			courseID,
			testType:3
        }
    })
}