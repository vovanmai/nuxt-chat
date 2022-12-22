<!-- Please remove this file from your project -->
<template>
  <el-form :rules="rules" ref="formFirst" :model="form" label-width="120px">
    <el-form-item label="Email" prop="name">
      <el-input
        v-model="form.name"
      ></el-input>
    </el-form-item>
    <el-form-item label="Title" prop="content">
      <el-input
        v-model="form.content"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'FormSecond',
  props: {
    form: Object
  },
  created() {
  },
  data () {
    return {
      rules: {
        name: [
          { required: true, message: 'Please input', trigger: ['blur', 'change'] },
        ],
        content: [
          { required: true, message: 'Please input', trigger: ['blur', 'change'] },
        ],
      }
    }
  },
  methods: {
    validateForm () {
      this.$refs.formFirst.validate((valid) => {
        if (valid) {
          this.$emit('validateSuccess')
        }
      });
    }
  }
}
</script>
