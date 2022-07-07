<template>
  <div>
    <el-row>
      <el-col :span="8">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="8" class="login-col">
        <div class="grid-content bg-white">
          <el-row>
            <p class="login-title">欢迎登录智慧校园服务平台</p>
            <LoginIcon/>
          </el-row>
          <div style="position: absolute;left: 50%;transform: translate(-50%,-50%);bottom: -60px; width: 80%">
            <LoginForm @userlogin="callForCaptcha"/>
          </div>
          <el-dialog title="请输入验证码" :visible.sync="dialogVisible" width="500px" :before-close="handleClose" center>
            <div class="demo-image" style="transform: translate(40%,0%)">
              <div class="block">
                <el-image style="width: 100px; height: 100px" :src="url" fit="contain"></el-image>
              </div>
            </div>
            <br>
            <el-form :model="form" ref="captchaForm">
              <el-form-item>
                <el-input v-model="form.captcha" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="login">确 定</el-button>
              </span>
          </el-dialog>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LoginIcon from "@/views/Login/LoginIcon";
import LoginForm from "@/components/loginform/LoginForm";
import {loginNetwork} from "@/network/user";
import {getCaptchaNetwork} from "@/network/user";
import {addCookie} from "@/util/cookie";


export default {
  name: "LoginIndex",
  components: {
    LoginIcon,
    LoginForm
  },
  data() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      dialogVisible: false,
      form: {
        captcha: '',
        userName: '',
        userPwd: ''
      }
    }
  },
  methods: {
    callForCaptcha(form) {
      this.userName = form.username
      this.userPwd = form.password

      getCaptchaNetwork(this.userName).then(data=>{
        console.log(data);
        this.url = window.URL.createObjectURL(data);
      })
      this.dialogVisible = true;
    },
    login() {
      let captcha = this.form.captcha
      let userName = this.userName
      let userPwd = this.userPwd

      const loading = this.$loading({
        lock: true,
        text: '正在登录',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      loginNetwork(userName, userPwd, captcha).then(data =>{
        if(data.success){
          //设置token到cookie中，
          addCookie("token", data.data.token)
          this.$message.success('登录成功')

          this.$store.commit('setLoginUser', data.data)
          this.$router.push('/noticeandnews')
        }else {
          this.$message.error(data.errorMsg)
        }
      }).catch(e => {
        this.$message.error('出错拉,检查网络试试或联系管理员')
      }).finally(()=>{
        loading.close()
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
  },
  beforeCreate() {
    this.$nextTick(() => {
      document.body.setAttribute('style', 'background:#99a9bf')
    })
  },
  beforeDestroy() {
    document.body.removeAttribute('style')
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-white {
  background: #f9fafc;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  position: relative;
  height: 600px;
}

.login-col {

  padding: 20px;
  text-align: center;
  margin-top: 100px;
  background-color: #f9fafc;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .256), 0 0 6px rgba(0, 0, 0, .04);
}

.login-title {
  font-size: 30px;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.1) !important;
  -webkit-text-stroke: 1px rgba(0, 0, 150, 0.7);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  text-align: center;
  width: 100%;
  margin: 20px 0;
}
</style>