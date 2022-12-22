<template>
  <div style="padding: 30px">
    <div style="width: 100%; height: 500px; background: aquamarine">
      <h1>Contact</h1>
      <div v-for="post in posts"> {{ post.title}} </div>
    </div>
  </div>
</template>

<script>
export default {
  // middleware: ['auth'],
  transition: 'home',
  layout: 'dark',
  data() {
    return {
      posts: [],
    };
  },
  // async asyncData({ $axios }) {
  //   let posts = await $axios.$get(`https://api.nuxtjs.dev/posts`)
  //   return { posts }
  // },
  created() {
    this.getPosts()
  },
  methods: {
    async getPosts() {
      this.posts = await this.$axios.$get(`https://api.nuxtjs.dev/posts`)
    }
  }
}
</script>


