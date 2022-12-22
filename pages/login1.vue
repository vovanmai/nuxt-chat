<template>
  <div>
    <div class="wrap">
      <div class="login">
        <input v-model="form.email" v-log />
        <input v-model="form.password" v-log />
        <el-button type="primary" @click="login1">{{ $t('login1.vue') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  transition: 'home',
  data() {
    return {
      active: 1,
      form: {
        email: '',
        password: '',
      }
    };
  },
  created() {
    if (this.$store.state.auth.loggedIn) {
      this.$router.push('/')
    }

    console.log(process.client)
  },
  mounted() {

  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: this.form,
        })

        this.$router.push('/vi/test')
      } catch (e) {
      }
    },
  }
}
</script>
<style>
  .body {
    position: relative;
  }
  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%);
    transform: translateX(-50%);
  }
</style>

