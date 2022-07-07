<template>

  <div class='content'>
	//创表
    <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="retakeData2"
        tooltip-effect="dark"
        border
        style="width: 100%;margin: auto"

        @selection-change="tableSelected">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          prop="courseId"
          label="课程id"
          width="120">
      </el-table-column>
      <el-table-column
          label="课程名称"
          width="180">
        <template slot-scope="scope">{{ scope.row.courseName }}</template>
      </el-table-column>
      <el-table-column
          prop="trueName"
          label="教师姓名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="semester"
          label="学期"
          width="120">
      </el-table-column>
      <el-table-column
          prop="location"
          label="上课地点">
      </el-table-column>
      <el-table-column
          prop="detail"
          label="备注">
      </el-table-column>
      <el-table-column
          prop="startWeek"
          label="开始周">
      </el-table-column>
      <el-table-column
          prop="endWeek"
          label=" 结束周">
      </el-table-column>
      <el-table-column
          prop="day"
          label="星期几"
          width="200">
      </el-table-column>
      <el-table-column
          prop="startTime"
          label="上课时间"
          width="200">
      </el-table-column>
      <el-table-column
          prop="endTime"
          label="下课时间"
          width="200">
      </el-table-column>

    </el-table>
    <el-table-item>
		//按钮绑定事件
      <el-button type="primary" icon="el-icon-check" @click="submitChoice()">提交</el-button>
    </el-table-item>
  </div>

</template>

<script>
import {getList, queryCSTCourseByName, submitData,} from "@/network/retake";
//调用接口功能

export default {
  data() {
    return {
      loading: false,
      merchantSelectedIds: [],
      retakeData2: [{
        day:"",
        courseName: '',
        courseId:"",
        trueName:"",
        semester:"",
        location:"",
        detai:"",
        startTime: '',
        endTime:"",
        startWeek:"",
        endWeek:""
      }
      ],
      multipleSelection: []
    }
  },
  methods: {
    tableSelected(val) {
      // 去重获取被选中的id值存入到数组中
      for (let selectedItem of val) {
        this.merchantSelectedIds.push(selectedItem.courseId)
      }
    },
    submitChoice() {
	 //提交按钮对应选课功能，利用选课接口
      const user = this.$store.state.loginUser;
      this.loading = true;
      submitData(this.merchantSelectedIds[0], user.id).then(data => {
        this.loading = false;
		//测试用，实际使用时不会有提示
        if (data.success) {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
        } else {
          debugger
          this.$message({
            message: data.errorMsg,
            type: 'error'
          });
        }
      })
    },
    getList() {
		//获取需要重修的课程信息
      this.loading= true
      const user = this.$store.state.loginUser;
      getList(user.id).then(data => {
        if (data.success) {
          this.retakeData2 = []
          for (var i = 0; i < data.data.length; i++) {
			//查询未通过课程课程名，利用数组不断赋值以储存
            let courseName = data.data[i]
            queryCSTCourseByName(courseName).then(data=>{
			//通过储存的课程名查询对应课程名的全部课程，并且不断给属性赋值
              if (data.success){
                debugger
                for (let i=0;i<data.data.length;i++){
                  if (data.data[i].teacherList.length>1){
					  //不止一门需要重修时
                    for (let a=0;a<data.data[i].teacherList.length;a++){
                      debugger
                      let formData = {}
                      formData.startTime = data.data[i].courseTimeList[a].startTime
                      formData.endTime = data.data[i].courseTimeList[a].endTime
                      formData.day = data.data[i].courseTimeList[a].day
                      formData.courseName = data.data[i].courseName
                      formData.detail = data.data[i].detail
                      formData.location = data.data[i].location
                      formData.semester = data.data[i].semester
                      formData.startWeek = data.data[i].startWeek
                      formData.endWeek = data.data[i].endWeek
                      formData.courseId = data.data[i].id
                      formData.trueName = data.data[i].teacherList[a].trueName
                      this.retakeData2.push(formData)
                    }
                  }else {
					  //只有一门需要重修时
                    let formData = {}
                    formData.startTime = data.data[i].courseTimeList[0].startTime
                    formData.endTime = data.data[i].courseTimeList[0].endTime
                    formData.day = data.data[i].courseTimeList[0].day
                    formData.courseName = data.data[i].courseName
                    formData.detail = data.data[i].detail
                    formData.location = data.data[i].location
                    formData.semester = data.data[i].semester
                    formData.startWeek = data.data[i].startWeek
                    formData.endWeek = data.data[i].endWeek
                    formData.courseId = data.data[i].id
                    formData.trueName = data.data[i].teacherList[0].trueName
                    this.retakeData2.push(formData)
                  }

                }
              }
            })
          }
          this.loading = false;
        }
      })
    }
  },
  created() {
	  //获取信息
    this.getList();
  }
}
</script>
