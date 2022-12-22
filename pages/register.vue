<template>
  <div class="page-login w-100">
    <el-row class="d-flex justify-center">
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div class="text-center" style="font-size: 20px">{{ $t('register')}}</div>
          </div>
          <el-form @submit="registerUser" ref="registerForm" label-position="top" label-width="100px" :model="form" :rules="getRules( )">
            <el-form-item :label="$t('full_name')" prop="full_name">
              <el-input :placeholder="$t('last_name_and_first_name_ex')" v-model="form.full_name"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email" :class="errors.email ? 'is-error' : ''">
              <el-input v-model="form.email" :class="errors.email ? 'field-error' : ''"></el-input>
              <div v-if="errors.email" class="el-form-item__error">{{ errors.email }}</div>
            </el-form-item>
            <el-form-item :label="$t('password')" prop="password">
              <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('password_confirmation')" prop="password_confirmation">
              <el-input type="password" v-model="form.password_confirmation" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="text-center pt-20">
              <el-button @click="registerUser" type="primary" round>{{ $t('register')}}</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  transition: 'fade-custom',
  layout: 'Auth',
  head() {
    return {
      title: this.$t('register'),
    }
  },
  data() {
    return {
      form: {
        email: '',
        full_name: '',
        password: '',
        password_confirmation: '',
      },
      errors: {}
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
    ...mapActions('user', ['register']),
    async registerUser() {
      console.log('submit')
      this.$refs['registerForm'].validate(async (valid) => {
        if (valid) {
          try {
            await this.register(this.form)
            this.$notify({
              title: this.$i18n.t('success'),
              message: this.$i18n.t('success'),
              type: 'success'
            });
            this.$router.push(this.localePath('login'))
          } catch (error) {
            const statusCode = error.response.status
            if (statusCode === 422) {
              this.errors = error.response.data.errors
            }
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
      const checkMatchPassword = (rule, value, callback) => {
        if (value !== this.form.password) {
          callback(new Error(this.$t('validation.password_confirm_not_match')));
        } else {
          callback();
        }
      };
      return {
        full_name: [
          { required: true, message: this.$t('validation.required_without_label'), trigger: 'blur' },
          { max: 50, message: this.$t('validation.max_length', { value: 50 }), trigger: 'blur' },
          { min: 6, message: this.$t('validation.min_length', { value: 6 }), trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$t('validation.required_without_label'), trigger: 'blur' },
          { type: 'email', message: this.$t('validation.invalid_email'), trigger: 'blur' },
        ],
        password: [
          { required: true, message: this.$t('validation.required_without_label'), trigger: 'blur' },
          { min: 6, message: this.$t('validation.min_length', { value: 6 }), trigger: 'blur' }
        ],
        password_confirmation: [
          { required: true, message: this.$t('validation.required_without_label'), trigger: 'blur' },
          { min: 6, message: this.$t('validation.min_length', { value: 6 }), trigger: 'blur' },
          { validator: checkMatchPassword, trigger: 'blur' }
        ],
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

