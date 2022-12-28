export const state = () => ({
  user: null,
  activeUsers: []
})

export const mutations = {
  setUser(state, value) {
    state.user = value
  },

  setActiveUser(state, value) {
    state.activeUsers.push(value)
  },
}

export const actions = {
  async register (context, body) {
    try {
      const { data } = await this.$axios.post('register', body)
      context.commit('setUser', data.data)
    } catch (error) {
      throw error
    }
  },
}
