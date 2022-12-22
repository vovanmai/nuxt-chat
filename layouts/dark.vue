<template>
  <div class="">
    <div style="margin-bottom: 50px; margin-left: 50px; margin-top: 20px">
      <NuxtLink v-if="!loggedIn" style="margin-right: 100px"  :to="localePath('/login')">{{ $t('login') }}</NuxtLink>
      <el-button v-else type="primary" @click="logout">{{ $t('logout') }}</el-button>
      <NuxtLink style="margin-right: 100px" :to="localePath('')"> {{ $t('home_page') }}</NuxtLink>
      <NuxtLink style="margin-right: 100px" :to="localePath('about')">{{ $t('about_page') }}</NuxtLink>
      <NuxtLink style="margin-right: 100px" :to="localePath('contact')">{{ $t('contact_page') }}</NuxtLink>
      <NuxtLink style="margin-right: 100px" :to="localePath('test')">{{ $t('test_page') }}</NuxtLink>
      <el-select v-model="language" @change="changeLanguage" :placeholder="$t('select_language')">
        <el-option
          v-for="item in languages"
          :key="item.value"
          :label="item.text"
          :value="item.value">
        </el-option>
      </el-select>
      {{language}}
      {{locale}}
    </div>
    <Nuxt />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  transition: 'home',
  layout: 'dark',
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Creative Websites | Digital Solutions | Online Marketing'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'I offer your business digital solutions ...'
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://thenextbit.de/seo/og_image.jpg'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://thenextbit.de/'
        },
        {
          property: 'og:locale',
          content: 'de_DE'
        }
      ]
    };
  },
  computed: {
    ...mapState([
      'locale'
    ]),
    loggedIn () {
      return this.$store.state.auth.loggedIn;
    }
  },
  data() {
    return {
      language: this.$i18n.locale,
      languages: [
        {
          value: 'en',
          text: 'English',
        },
        {
          value: 'vi',
          text: 'Tiếng việt',
        },
      ]
    };
  },


  methods: {
    ...mapActions([
      'setLocale'
    ]),
    async logout() {
      await this.$auth.logout();
      this.$notify({
        title: this.$i18n.t('success'),
        message: this.$i18n.t('logout_success'),
        type: 'success'
      });
      this.$router.push(this.localePath('login'))
    },
    changeLanguage (value) {
      this.$i18n.setLocale(value)
      this.setLocale(value)
    }
  },
  created() {
  }
}
</script>

<style scoped>
.dark {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background: black;
  color: white;
  padding: 10px;
}
.dark a {
  color: white;
}
</style>
