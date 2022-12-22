<template>
  <div class="page-login w-100">
    <el-row class="d-flex justify-center">
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div class="text-center" style="font-size: 20px">{{ $t('login')}}</div>
          </div>
          <el-form @submit.native="login" ref="loginForm" label-position="top" label-width="100px" :model="form" :rules="getRules()">
            <el-form-item label="Email" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="text-center pt-20">
              <el-button @click="login" type="primary" round>{{ $t('login')}}</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  transition: 'fade-custom',
  layout: 'Auth',
  head() {
    return {
      title: this.$t('login'),
    }
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      }
    };
  },
  created() {
    if (this.$store.state.auth.loggedIn) {
      this.$router.push(this.localePath('/'))
    }
  },
  mounted() {

  },
  methods: {
    async login() {
      this.$refs['loginForm'].validate(async (valid) => {
        if (valid) {
          try {
            await this.$auth.loginWith('local', {
              data: this.form,
            })
            this.$notify({
              title: this.$i18n.t('success'),
              message: this.$i18n.t('login_success'),
              type: 'success'
            });
            this.$router.push(this.localePath('/chats'))
          } catch (error) {
            this.$notify.error({
              title: this.$i18n.t('error'),
              message: error.response.data.message,
              type: 'error'
            });
          }
        }
      });
    },

    getRules() {
      return {
        email: [
          { required: true, message: this.$i18n.t('validation.required_without_label'), trigger: 'blur' },
          { type: 'email', message: this.$i18n.t('validation.invalid_email'), trigger: 'blur' },
        ],
        password: [
          { required: true, message: this.$i18n.t('validation.required_without_label'), trigger: 'blur' },
        ]
      }
    }
  }
}
</script>
<style scoped>
  .page-login {
    margin-top: 50px;
  }
</style>

