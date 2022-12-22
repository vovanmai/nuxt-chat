<template>
  <div style="padding: 30px">
    <div v-for="item in messages">{{ item}}</div>
    <h1>Online users</h1>
    <div v-for="item in onlineUsers">{{ item.name + ' just online' }}</div>
    <FormFirst ref="formFirst" :form="forms.form_first" @validateSuccess="() => validateFormFirst = true "></FormFirst>
    <FormSecond ref="formSecond" :form="forms.form_second" @validateSuccess="() => validateFormSecond = true"></FormSecond>

    <el-button type="primary" @click="submit">Login</el-button>

    <input type="file" @change="uploadFile" ref="file" multiple="multiple">
    <button @click="submitFile">Upload!</button>
    <test ref="ee" :value="valueTest"></test>
    <button @click="editTest()">action</button>
    <button @click="click()">KKKK</button>

    <span>😍</span>
    <span>😍</span>
    <span>😍</span>

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
  // middleware: ['authenticated'],
  layout: 'dark',
  data() {
    return {
      valueTest: 'test',
      onlineUsers: [],
      messages: [],
      forms: {
        form_first: {
          email: 1,
          title: '2',
          description: '',
        },
        form_second: {
          name: '',
          content: '',
        }
      },
      validateFormFirst: false,
      validateFormSecond: false,
      form_test: {
        name: null,
        image: null,
        report: {
          phone: 'phone',
          address: 'address',
          item: {
            item1: 'item1'
          }
        },
        items: [
          {
            name: 'name1',
            email: 'email1',
          },
          {
            name: null,
            email: null,
          }
        ],
        empty_array: []
      }
    }
  },
  methods: {
    submit() {
      this.$refs.formFirst.validateForm();
      this.$refs.formSecond.validateForm();
      console.log(this.validateFormFirst, this.validateFormSecond)
    },
    validateSuccess(e) {
      this.validateFormFirst = true
    },
    uploadFile () {

    },
    click () {
      console.log(this.localePath('/contact'))
      this.$router.push(this.localePath('/contact'))
    },
    submitFile () {
      let formData = new FormData()

      const item = {
        email: 'email',
        name: 'name',
      }
      for ( var key in item ) {
        formData.append(key, item[key]);
      }

      // formData.append('names[0]', 1)
      // formData.append('names[1]', 2)
      // formData.append('names[2]', 3)
      //
      console.log(formData.getAll('name'))
    },
    leaving() {
      this.$axios.get('http://my-heroku-app.test/api/v1/close-browser')
    },
    async editTest() {

      this.valueTest = 'changed'
      this.$nextTick(async () => {
        this.$refs.ee.check()
      })

    }
  },
  watch: {

  },
  created() {
    console.log('created2')
  },
  mounted() {
    this.$echo.private('my-channel')
      .on('my-event', (e) => {
        this.messages.push(e)
      });

    this.$echo.join('user-online')
      .here((users) => {
        console.log('here =>>>>')
        this.onlineUsers = [...users];
      })
      .joining((user) => {
        console.log('joining =>>>>', user.name)
        this.onlineUsers = [...this.onlineUsers, user]
      })
      .leaving((user) => {
        this.onlineUsers = this.onlineUsers.filter((item) => {
          return item.id !== user.id
        })
        console.log('leaving =>>>>', user.name);
      })
      .on('my-event-online', (e) => {
      })
      .error((error) => {
      });


    // window.addEventListener("beforeunload", this.leaving);


    // this.$echo.private('my-channel')
    //   .whisper('typing', {
    //     name: 'this.user.name'
    //   });

    // this.$echo.join('user-online')
    //   .joining((user) => {
    //     console.log(222222222222);
    //   })
    // console.log(this.$echo.join('user-online'));
  },
  destroyed() {
    this.$echo.leave('user-online')
  }
}
</script>


