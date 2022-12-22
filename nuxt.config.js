import vi from './locales/vi'
import en from './locales/en'

export default {
  server: {
    port: process.env.PORT, // default: 3000
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'My App Lionel Vo',
    titleTemplate: '%s - My App Lionel Vo',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      // { hid: 'stripe', src: 'https://js.stripe.com/v3', defer: true }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/reset.css',
    'element-ui/lib/theme-chalk/index.css',
    'ant-design-vue/dist/antd.css',
    '@/assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/ant-ui',
    { src: '@/plugins/ckeditor' , ssr: false },
    '@/plugins/axios',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['@nuxtjs/moment', {
      locales: ['vi'],
      defaultLocale: 'vi',
      // defaultTimezone: 'Asia/Ho_Chi_Minh'
    }],
    [
      '@nuxtjs/i18n',
      {
        locales: ['en', 'vi'],
        defaultLocale: 'vi',
        vueI18n: {
          fallbackLocale: 'vi',
          messages: {
            en: en,
            vi: vi
          }
        },
        seo: true,
        // strategy: 'prefix',
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          redirectOn: 'root',  // recommended
        }
      }
    ],
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
    [
      '@nuxtjs/laravel-echo',
      {
        //pusher
        broadcaster: 'pusher',
        key: process.env.PUSHER_APP_KEY,
        cluster: 'ap1',
        authEndpoint: process.env.API_BASE_URL + '/api/v1/broadcasting/auth',
        authModule: true,
        // forceTLS: true
        //Soketi
        // broadcaster: 'pusher',
        // key: process.env.MIX_PUSHER_APP_KEY,
        // wsHost: process.env.MIX_PUSHER_HOST,
        // wsPort: process.env.MIX_PUSHER_PORT,
        // wssPort: process.env.MIX_PUSHER_PORT,
        // forceTLS: false,
        // encrypted: true,
        // disableStats: true,
        // enabledTransports: ['ws', 'wss'],
        // authEndpoint: process.env.API_BASE_URL + '/api/v1/broadcasting/auth',
        // authModule: true,
      },
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
  loading: {
    color: '#1890ff',
    height: '3px'
  },
  axios: {
    baseURL: process.env.API_BASE_URL + '/api/v1',
    progress: false,
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'auth', method: 'post', propertyName: 'data.access_token' },
          user: { url: 'profile', method: 'get', propertyName: 'data' },
          logout: { url: 'logout', method: 'get' }
        }
      }
    }
  },
  publicRuntimeConfig: {
    // apiBaseUrl: process.env.API_BASE_URL
  },
}
