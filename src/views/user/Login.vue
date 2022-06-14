<template>
  <div class="main">
    <a-form-model
      class="user-layout-login"
      ref="formLogin"
      name="formLogin"
      :model="form"
    >
      <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" :message="$t('user.login.message-invalid-credentials')" />
      <a-form-model-item
        prop="userName">
        <a-input
          size="large"
          type="text"
          :placeholder="'Tài khoản'"
          v-model="form.userName"
          style="margin-top: 15px"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-model-item>

      <a-form-model-item
        prop="password">
        <a-input-password
          size="large"
          :placeholder="'Mật khẩu'"
          v-model="form.password"
          style="margin-top: 15px"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input-password>
      </a-form-model-item>
      <a-form-model-item
        label="Mã xác nhận"
        prop="captcha"
      >
        <div style="margin-top: 15px">
          <a-row :gutter="16">
            <a-col :xs="12" :md="12" :lg="12">
              <a-input
                size="large"
                :placeholder="'Mã xác nhận'"
                v-model="form.captcha"
              >
              </a-input>
            </a-col>
            <a-col :xs="12" :md="12" :lg="12">
              <div style="display: flex; justify-content: flex-start">
                <div>
                  <img :src="captcha.captcha" style="width: 100px; height: auto" alt="">
                </div>
                <div>
                  <a-button type="default" style="margin-left: 8px" @click="getCaptcha"><a-icon type="sync"></a-icon></a-button>
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="loginBtn"
          :disabled="loginBtn"
          style="margin-top:24px"
          @click="handleSubmit"
        >{{ $t('user.login.login') }}</a-button>
      </a-form-model-item>

    </a-form-model>
  </div>
</template>

<script>
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { getCaptcha, login } from '@/api/login'

export default {
  components: {
    TwoStepCaptcha
  },
  data () {
    return {
      loginBtn: false,
      form: {
        userName: '',
        password: '',
        captcha: '',
        transactionId: ''
      },
      isLoginError: false,
      captcha: null
    }
  },
  created () {
    this.getCaptcha()
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    handleSubmit () {
      this.loginBtn = true
      const params = {
        userName: this.form.userName,
        password: this.form.password,
        captcha: this.form.captcha,
        transactionId: this.form.transactionId
      }
      console.log(params)
      this.$refs.formLogin.validate(valid => {
        if (valid) {
          console.log(valid)
          login(params).then((res) => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              this.loginBtn = false
          })
        }
      })
    },
    loginSuccess (res) {
      console.log(res)
      this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed (err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    },
    getCaptcha () {
      getCaptcha({}).then(rs => {
        if (rs) {
          this.captcha = rs
          this.form.transactionId = rs.transactionId
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
