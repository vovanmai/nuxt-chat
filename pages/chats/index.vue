<template>
  <div class="official-main d-flex justify-center align-item-center">
    <h1 style="color: #68696f">{{ $t('please_select_channel') }}</h1>
  </div>
</template>

<script>
import welcome from '~/assets/images/chat.jpg'
import {mapMutations} from "vuex";

export default {
  name: 'ChatIndex',
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
