import { remove, map, find, filter } from 'lodash'

export const state = () => ({
  channel: null,
  channels: [],
  activeUsers: [],
  activeUserIds: [],
})

export const mutations = {
  setChannels(state, data) {
    state.channels = [...state.channels, ...data]
    map(state.channels, (item) => {
      if (state.activeUserIds.includes(item.sender.id)) {
        item.sender.active = true
      } else if (state.activeUserIds.includes(item.receiver.id )) {
        item.receiver.active = true
      }
      return item
    })
  },

  setActiveUsers(state, data) {
    state.activeUsers = data
    state.activeUserIds = map(data, 'id')
    map(state.channels, (item) => {
      if (state.activeUserIds.includes(item.sender.id)) {
        item.sender.active = true
      } else if (state.activeUserIds.includes(item.receiver.id )) {
        item.receiver.active = true
      }
      return item
    })
  },

  setActiveUser(state, value) {
    const val = find(state.activeUsers, (item) => { return item.id === value.id })
    if (!val) {
      state.activeUsers.push(value)
      state.activeUserIds.push(value.id)
    }
  },

  setInActiveUser(state, value) {
    state.activeUsers = filter(state.activeUsers, (item) => {
      return item.id !== value.id
    })

    state.activeUserIds = filter(state.activeUserIds, (item) => {
      return item !== value.id
    })
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

    if (state.activeUserIds.includes(value.sender.id)) {
      value.sender.active = true
    } else if (state.activeUserIds.includes(value.receiver.id)) {
      value.receiver.active = true
    }

    channels.unshift(value)
    state.channels = channels
  },

  setActiveUserForChannel(state, data) {
    map(state.channels, (item) => {
      if (item.sender.id == data.user_id) {
        item.sender.active = data.active
      } else if (item.receiver.id == data.user_id) {
        item.receiver.active = data.active
      }
      return item
    })
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
