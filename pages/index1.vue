<template>
  <div style="padding: 30px">
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <input :checked="todo.done" @change="toggle(todo)" type="checkbox">
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
      </li>
      <li><input @keyup.enter="addTodo" placeholder="What needs to be done?"></li>
    </ul>

    <p>{{ todos }}}</p>

    <el-steps :active="active" finish-status="success">
      <el-step title="Step 1"></el-step>
      <el-step title="Step 2"></el-step>
      <el-step title="Step 3"></el-step>
    </el-steps>
    <h1>abcde</h1>
    <el-button style="margin-top: 12px;" @click="next" v-show="active < 3"> >> </el-button>
    <el-button style="margin-top: 12px;" @click="previous" v-show="active > 1"> << </el-button>

    <el-input @focus="test()" placeholder="Please input" v-model="input"></el-input>


    <div style="margin-top: 30px">
      <Transition name="home" mode="out-in">
        <StepOne v-if="active === 1"></StepOne>
        <StepTwo v-if="active === 2"></StepTwo>
        <StepThree v-if="active === 3"></StepThree>
      </Transition>
    </div>
    <button @click="test">BBBBBBB</button>
    {{ this.$store.state.auth.user }}
  </div>
</template>

<script>
import StepOne from '@/components/StepOne.vue'
import StepTwo from '@/components/StepTwo.vue'
import StepThree from '@/components/StepThree.vue'
import { mapMutations, mapActions } from 'vuex'

export default {
  middleware: ['authenticated'],
  transition: 'fade',
  layout: 'dark',

  components: {
    StepOne,
    StepTwo,
    StepThree,
  },
  computed: {
    todos () {
      return this.$store.state.todos.list
    }
  },
  data() {
    return {
      active: 1,
      posts: [],
      message: 1,
      a: 1,
      input: null,
    };
  },

  head() {
    return {
      title: 'Home page',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page description'
        }
      ]
    }
  },
  // async asyncData({ params, $http }) {
  //   const post = await $http.$get(`https://api.nuxtjs.dev/posts`)
  //   return { post }
  // },

  methods: {
    next() {
      if (this.active < 3) {
        this.active++
      }
    },
    test() {
      this.$store.dispatch('getProfile')
    },
    previous() {
      if (this.active > 1) {
        this.active--
      }
    },
    changeMessage () {
      this.message++
    },
    async logout() {
      await this.$auth.logout();
      this.$router.push('/login')
    },
    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    }),
    ...mapActions({
      reset: 'todos/reset'
    })
  },
  created() {
    console.log(this.$store.state.auth.user.data.created_at)
    console.log(this.$moment(this.$store.state.auth.user.data.created_at).fromNow())
  }
}
</script>


