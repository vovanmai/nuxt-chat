export const state = () => ({
  locale: 'vi',
})

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  }
}

export const mutations = {
  setLocale(state, locale) {
    state.locale = locale
  },

  removeCurrentUserLogin(state) {
    state.auth.user = null
    state.auth.loggedIn = false
  },
}

export const actions = {
  setLocale (context, locale) {
    context.commit('setLocale', locale)
  },

  removeCurrentUserLogin (context) {
    context.commit('removeCurrentUserLogin')
  },

  async getProfile ({ commit }) {
    await this.$axios.$get('profile')
  },
}
