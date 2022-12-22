export default function ({ $axios, redirect, app, store }) {
  $axios.onRequest(config => {
    if(app.$cookiz.get('auth._token.local')) {
      config.headers.common['Authorization'] = app.$cookiz.get('auth._token.local')
    }
    config.headers.common['Language'] = app.i18n.locale
  })

  $axios.onError(error => {
    let locale = app.i18n.locale === app.i18n.defaultLocale ? '' : '/' + app.i18n.locale;
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      app.$cookiz.set('auth._token.local', false)
      store.dispatch('removeCurrentUserLogin')
      redirect(`${locale}/login`)
    }
  })
}
