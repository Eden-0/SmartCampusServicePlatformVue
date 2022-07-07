<template>

	<div class='content'>

  <el-table
    v-loading="loading"
    ref="multipleTable"
    :data="retakeData1"
    tooltip-effect="dark"
	border
    style="width: 100%;margin: auto"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="课程名称"
      width="180">
      <template slot-scope="scope">{{ scope.row.courseName }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="教师姓名"
	>
    </el-table-column>
  </el-table>
  <el-table-item>
    <el-button type="primary" icon="el-icon-check" @click="submitChoice">提交</el-button>
  </el-table-item>
  </div>

</template>

<script>
// import {queryUserUnPassCourse} from "@/network/rekate;
import {getList, getRetake} from "@/network/retake";

export default {
    data() {
      return {
        loading: false,
        retakeData1: [{
          courseName: 'C语言',
          name: '王小虎',
        }, {
          courseName: 'java',
          name: '王小虎',
        },
		],
        multipleSelection: []
      }
    },
  methods: {
    submitForm() {
          let loginUser = this.$store.getters.getLoginUser;
          updateUserInfoNetwork(loginUser.id, this.infoForm.phone, this.infoForm.email, this.infoForm.homeAddress).then(res => {
            console.log(res)
            if (res.success) {
              this.$message({
                message: '已成功报名',
                type: 'success'
              });
            } else {
              this.$message({
                message: '未能成功报名',
                type: 'error'
              });
            }
          })
    },
    getRetake(){
      debugger
      this.loading = true
      const user = this.$store.state.loginUser;
      getList(user.id).then(data=>{
        this.loading = false
        if (data.success){
          this.retakeData1 = data.data.records
          for(var i=0 ;i<this.retakeData1.length;i++){
            this.retakeData1[i].name = data.data.records[i].teacherList[0].trueName
            this.retakeData1[i].time = data.data.records[i].courseTimeList[0].startTime+"-"+data.data.records[i].courseTimeList[0].endTime
          }
        }
      })
    }
  },
  created() {
    this.getRetake();
  }
  }
</script>
