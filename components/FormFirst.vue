<!-- Please remove this file from your project -->
<template>
  <el-form :rules="rules" ref="formFirst" :model="form" label-width="120px">
    <el-input
      v-model="text"
      @blur="notTyping"
      @focus="typing"
    ></el-input>
    <el-form-item label="Email" prop="email">
      <el-input
        v-model="form.email"
        @input="trimValue"
      ></el-input>
    </el-form-item>
    <el-form-item label="Title" prop="title">
      <el-input
        v-model="form.title"
      ></el-input>
    </el-form-item>
    <el-form-item label="Description" prop="description">
      <client-only>
        <ckeditor :editor="editor" @blur="blurDes" @focus="focusDes" v-model="form.description" @input="inputDes" :config="editorConfig"></ckeditor>
      </client-only>
    </el-form-item>
    <div id="abc"></div>
    {{ this.form}}
    {{ this.dirtyDes}}
    <div v-if="isShow">
      <input v-model="text" v-log />
      <p>{{ text }}</p>
    </div>
    <button @click="show" v-text="isShow ? 'Close' : 'Show'" />
  </el-form>
</template>

<script>
let ClassicEditor

if (process.client) {
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
}

export default {
  name: 'FormFirst',
  components: {
  },
  props: {
    form: Object
  },
  created() {
  },
  data () {
    var validateEmptyDescription = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the description'));
      } else {
        callback();
      }
    };
    return {
      text: null,
      isShow: false,
      rules: {
        email: [
          { required: true, trigger: ['blur', 'change'] },
          { type: 'email', trigger: ['blur', 'change']},
        ],
        title: [
          { required: true, trigger: ['blur', 'change'] },
          { min: 5, trigger: ['blur', 'change'] },
        ],
        description: [
          { validator: validateEmptyDescription, trigger: ['blur', 'change'] },
        ],
      },
      editor: ClassicEditor,
      editorConfig: {
        ckfinder: {
          // Upload the images to the server using the CKFinder QuickUpload command.
          uploadUrl: 'http://backend-labor.test/api/v1/test-upload',
          // options: {
          //   resourceType: 'Images'
          // }
        }
      },
      dirtyDes: false,
    }
  },
  methods: {
    typing() {
      console.log('typing not timeout')
      setTimeout(function() {
        console.log('typing...')
      }, 2000);
    },
    notTyping() {
      console.log('not typing not timeout')
      setTimeout(function() {
        console.log('not typing...')
      }, 2000);
    },
    validateForm () {
      this.$refs.formFirst.validate((valid) => {
        if (valid) {
          this.$emit('validateSuccess')
        }
      });
    },
    trimValue (e) {
    },
    inputDes (e) {
      if (this.dirtyDes) {
        this.$refs.formFirst.validateField('description')
      }
    },
    blurDes (e) {
      console.log('blurDes')
      this.$refs.formFirst.validateField('description')
    },
    focusDes () {
      this.dirtyDes = true
      console.log('focusDes')
    },
    keyUp (e) {
      console.log(e.target.value)
    },
    show (e) {
      // e.preventDefault()
      this.isShow = !this.isShow
    }
  },
  mounted() {

  }
}
</script>
