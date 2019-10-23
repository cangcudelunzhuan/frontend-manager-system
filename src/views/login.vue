<template>
  <div class="page-login">
    <div class="page-lang"></div>
    <div class="page-content">
      <div class="logo">
        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo">
        <h1>大鱼财富-后台</h1>
      </div>

      <div class="main">
        <a-form>
          <a-form-item>
            <a-input
              size="large"
              placeholder="手机号"
              :maxLength="11"
              v-model="formData.phone">
              <a-icon
                slot="prefix"
                type="mobile"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item class="form-item_vcode">
            <a-input
              size="large"
              placeholder="验证码"
              :maxLength="6"
              v-model="formData.vcode">
            <a-icon
              slot="prefix"
              type="mail"
              style="color: rgba(0,0,0,.25)"
            />
            </a-input>
            <!-- <a-spin :spinning="spinning">
              <a-button size="large" :disabled="vcodeControl.disabled" @click="sendVcode">{{vcodeControl.text}}</a-button>
            </a-spin> -->
            <a-button size="large" v-if="vodebuttonshow" @click="sendVcode" :loading="spinning">获取验证码</a-button>
            <a-button size="large" v-else disabled >重新获取 {{time}}</a-button>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              size="large"
              class="login-form-button"
              @click="submitLogin">
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="page-footer"></div>
  </div>
</template>

<script>
import { getVcode, login } from '@/api/api.user'
import { setStorage } from '@/utils/storage'

// function timer () {
//   let conf = this.vcodeControl
//   let protoConf = Object.assign({}, conf)
//   let _timer = setInterval(() => {
//     conf.timeout--
//     conf.text = '重新获取(' + conf.timeout + ')'
//     conf.disabled = conf.timeout > 0
//     if (!conf.disabled) {
//       conf.timeout = protoConf.timeout
//       conf.text = protoConf.text
//       clearInterval(_timer)
//     }
//   }, 1000)
// }

export default {
  data () {
    return {
      sendedVcode: false,
      vcodeControl: {
        timeout: 60,
        text: '获取验证码',
        disabled: false
      },
      formData: {
        phone: '',
        vcode: ''
      },
      spinning: false,
      vodebuttonshow: true,
      time: 60
    }
  },
  methods: {
    async sendVcode () {
      if (!this.formData.phone) {
        this.$message.info('请先输入手机号！')
        return
      }
      this.spinning = true
      try {
        await getVcode(this.formData.phone)
        this.$message.success('验证码已发送，请查收')
        // timer.call(this)
        this.sendedVcode = true
        this.spinning = false
        this.vodebuttonshow = false
        let _time = setInterval(() => {
          if (this.time > 0) {
            this.time--
          } else {
            clearInterval(_time)
            this.vodebuttonshow = true
            this.time = 60
          }
        }, 1000)
      } catch (e) {
        this.spinning = false
      }
    },
    submitLogin () {
      if (!this.sendedVcode) {
        this.$message.info('请先获取验证码！')
        return
      }
      login(this.formData).then(({ headers }) => {
        console.log(headers)
        setStorage('token', headers.token)
        this.$router.push({ name: 'home' })
      })
    }
  }
}
</script>

<style lang="less">
.page-login {
  height: 100vh;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover cover;
  background-color: #f0f2f5;
  .page-lang {
    height: 40px;
  }
  .page-content {
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 30px 0 60px;
      img {
        width: 44px;
        margin-right: 20px;
      }
      h1 {
        font-size: 33px;
        margin: 0;
      }
    }
    .main {
      width: 368px;
      margin: 0 auto;
      .ant-form-item {
        margin-bottom: 20px;
      }
      .form-item_vcode .ant-form-item-children {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ant-input-affix-wrapper {
          margin-right: 20px;
        }
      }
      .login-form-button {
        width: 100%;
      }
    }
  }
}
</style>
