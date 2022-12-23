import { remove, map } from 'lodash'

export const state = () => ({
  channel: null,
  channels: [],
})

export const mutations = {
  setChannels(state, data) {
    state.channels = [...state.channels, ...data]
  },

  resetChannels(state) {
    state.channels = []
  },

  setChannel(state, value) {
    state.channel = value
  },

  updateUnreadTotalMessage(state, data) {
    map(state.channels, (item) => {
      if (data.id === item.id) {
        item.unread_message_total = data.data
      }
      return item
    })
  },

  addChannel(state, value) {
    const channels = remove(state.channels, (item) => {
      return item.id !==  value.id
    })
    channels.unshift(value)
    state.channels = channels
  },
}

export const actions = {
  async getChannel (context, id) {
    try {
      const { data } = await this.$axios.get(`chat-channels/${id}`)
      context.commit('setChannel', data.data)
    } catch (error) {
      throw error
    }
  },

  async getChannels (context, params) {
    try {
      const { data } = await this.$axios.get('chat-channels', { params })
      context.commit('setChannels', data.data.data)
      return data.data
    } catch (error) {
      throw error
    }
  },

  async readChannel (context, id) {
    try {
      const { data } = await this.$axios.post(`chat-channels/${id}/read`)
      context.commit('updateUnreadTotalMessage', {
        id: id,
        data: data.data
      })
      return data.data
    } catch (error) {
      throw error
    }
  },
}
