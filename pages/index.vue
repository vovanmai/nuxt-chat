<template>
  <div class="official-main d-flex justify-center align-item-center">
    <h1 style="color: #68696f">{{ $t('please_select_channel') }}</h1>
  </div>
</template>

<script>
export default {
  middleware: ['authenticated'],
  layout: 'Main',
  computed: {
  },
  data() {
    return {
    };
  },

  head() {
    return {
      title: 'Chat',
    }
  },
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
