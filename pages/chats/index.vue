<template>
  <div class="official-main">
    <img :src="imageWelcome" alt="">
  </div>
</template>

<script>
import welcome from '~/assets/images/chat.jpg'
import {mapMutations} from "vuex";

export default {
  middleware: ['authenticated'],
  layout: 'Main',
  computed: {
  },
  data() {
    return {
      imageWelcome: welcome,
    };
  },

  head() {
    return {
      title: 'Chat',
    }
  },
  methods: {
    ...mapMutations('channel', ['resetChannels'])
  },
  async created() {
  },
  mounted() {
  },
  updated() {
  },
  destroyed() {

  }
}
</script>

<style lang="scss" scoped>
  .official-main {
    height: 100%;
    width: 100%;
    img {
      height: 100%;
      width: 100%;
    }
  }
</style>
