<!-- Please remove this file from your project -->
<template>
  <div :title="$t()">
      {{ $moment().fromNow() }}
  </div>
</template>

<script>
export default {
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      },
    };
  },
  data() {
    return {
      abc: ''
    }
  },
  created() {
    console.log('test')
  },
  methods: {
    check () {
    }
  },
}
</script>
