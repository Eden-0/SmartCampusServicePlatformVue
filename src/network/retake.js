import {request} from "@/network/request";
//调用接口获取数据与提交数据
export function getList(id){
	//查询需要重修的课程的课程名
    return request({
        url: '/courseRecord/queryNeedRetake',
        method:'post',
        data:{
            "userId": id,
        }
    })
}
export function queryCSTCourseByName(courseName){
	//通过课程名来查对应所有课程的课程信息
    return request({
        url: '/course/queryCSTCourseByName?courseName='+courseName,
        method:'post',
        data:{
            courseName:courseName
        }
    })
}
export function submitData(courseId,userId){
	//提交选课结果
    return request({
        url: '/selectCourse/seckillCourse?courseId='+courseId+'&userId='+userId,
        method:'post',
        data:{
        }
    })
}


