<template>
  <blank-layout>
    <div class="container">
      <div class="limiter">
        <div class="container-login">
          <div class="wrap-login">
            <a-row :gutter="16" style="width: 100%;">
              <img src="~@/assets/Logo_VNA.svg" class="logo" alt="logo">
              <a-form-modelx
                ref="ruleFormLogin"
                :model="form"
                class="user-layout-login"
              >
                <a-form-model-item
                  label="Tài khoản"
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
                  label="Mật khẩu"
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
                  >Đăng nhập</a-button>
                </a-form-model-item>

              </a-form-modelx>
            </a-row>
          </div>
        </div>
      </div>
    </div>
  </blank-layout>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { getCaptcha, login } from '@/api/login'
import BlankLayout from '@/layouts/BlankLayout'

export default {
  components: {
    BlankLayout
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
      captcha: null

    }
  },
  async created () {
    await this.getCaptcha()
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    handleSubmit () {
      console.log(1)
      this.$refs.ruleFormLogin.validate(valid => {
        if (valid) {
          console.log(2)
          this.loginBtn = true
          const params = {
            userName: this.form.userName,
            password: this.form.password,
            captcha: this.form.captcha,
            transactionId: this.form.transactionId
          }
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
      setTimeout(() => {
        this.$notification.success({
          message: 'Lỗi',
          description: `${timeFix()}，Chào mừng trở lại`
        })
      }, 1000)
    },
    requestFailed (err) {
      this.$notification['error']({
        message: 'Lỗi',
        description: ((err.response || {}).data || {}).message,
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
