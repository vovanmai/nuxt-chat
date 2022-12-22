<template>
  <div>
      <div>2</div>
      <div>2</div>
      <div>2</div>
      <div>2</div>
      <div>2</div>
      <div>2</div>
      <div>2</div>
      <div>2</div>
      <div>2</div>
      <div>2</div>
      <div>2</div>
      <div>2</div>
      <div>2</div>
      <div>2</div>
      <div>2</div>
      <div>2</div>
      <div>2</div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  middleware: ['authenticated'],
  transition: 'fade-custom',
  layout: 'Main',
  components: {
  },
  computed: {
  },
  data() {
    return {
    };
  },

  head() {
    return {
      title: 'Home page',
    }
  },
  methods: {

  },
  created() {
    console.log('index')
  }
}
</script>


