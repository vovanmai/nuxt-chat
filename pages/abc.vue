<template>
  <div style="padding: 30px">
    <div v-if="isShow">
      <input v-model="text" v-log />
      <p>{{ text }}</p>
    </div>
    <button @click="show" v-text="isShow ? 'Close' : 'Show'" />
  </div>
</template>

<script>
import FormFirst from "@/components/FormFirst";
import Test from "@/components/Test";
const decodeUriComponentTest = require('decodeuricomponent');
import { serialize } from 'object-to-formdata';

export default {
  components: {
    FormFirst,
    Test,
  },
  transition: 'home',
  layout: 'dark',
  data() {
    return {
      text: '111   ',
      message: '',
      isShow: false,
    }
  },
  methods: {
    show (e) {
      // e.preventDefault()
      this.isShow = !this.isShow
    }
  },
  watch: {

  },
  created() {
  },
  mounted() {
    // window.onclick = function(event) {
    //   console.log(event.target.className)
    // }
  }
}
</script>


