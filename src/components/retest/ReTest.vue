<template>
	<!-- 创表 -->
  <el-table
    :data="retakeData3"
    border
    style="width: 100%">
    <el-table-column
      prop="courseName"
      label="课程名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="starttime"
      label="开始考试时间"
	  width="250">
    </el-table-column>
	<el-table-column
	  prop="endtime"
	  label="结束考试时间"
	  width="250">
	</el-table-column>
	<el-table-column
	  prop="location"
	  label="考试地点">
	</el-table-column>
  </el-table>
</template>

<script>
	import {queryUserUnPassCourse} from "@/network/retest";
	import {createReTest} from "@/network/retest";
    import {conditionPageQuery} from "@/network/retest";
	//调用接口
  export default {
	  //静态页面数据
    data() {
      return {
        retakeData3: [{
          courseName: '高等数学',
		  starttime:'2022/7/6 18:00',
		  endtime:'2022/7/6 18:00',
          location: '一教A302'
        }, {
          courseName: '概率统计',
		  starttime:'2022/7/7 16:00',
		  endtime:'2022/7/7 18:00',
          location: '综合楼C107'
        }, {
          courseName: '离散数学',
		  starttime:'2022/7/8 16:00',
		  endtime:'2022/7/8 18:00',
          location: '一教B406'
        },
		],
        formData: {
          courseName: '离散数学',
          starttime:'2022/7/8 16:00',
          endtime:'2022/7/8 18:00',
          location: '一教B406'
        },
      }
    },
	created() {
	    let loginUser = this.$store.getters.getLoginUser;
	    this.retakeData3 =[]
	    conditionPageQuery(loginUser.id).then(res => {
			//调用“条件分页查询考试”接口查询用户补考信息
	      if (res.success) {
	        console.log(res.data.records)
	        for (var i=0;i<res.data.records.length;i++){
				//利用数组将信息储存
	          let formData = {}
	          formData.courseName = res.data.records[i].courseTest.courseName
	          formData.starttime=res.data.records[i].courseTest.startTime
	          formData.endtime = res.data.records[i].courseTest.endTime
	          formData.location = res.data.records[i].courseTest.location
	          this.retakeData3.push(formData)
	        }
	        this.infoForm = res.data
	        console.log(this.infoForm)
	      } else {
	        this.$message.error('查询用户信息失败')
	      }
	    })
	  }
  }

</script>
