import {map} from "lodash";

export const state = () => ({
  message: null,
  messages: [],
})

export const mutations = {
  setMessages(state, data) {
    state.messages = state.messages.concat(data.reverse())
  },

  resetMessages(state) {
    state.messages = []
  },

  setMessage(state, data) {
    state.messages = state.messages.concat([data])
  },

  setReactMessage(state, data) {
    map(state.messages, (item) => {
      if (data.chat_message_id === item.id) {
        item.react_message = data
      }
      return item
    })
  },
}

export const actions = {
  async sendMessage (context, data) {
    try {
      await this.$axios.post('chat-messages', data)
    } catch (error) {
      throw error
    }
  },

  async getMessages (context, params) {
    try {
      const url = params.next_page ? params.next_page : `chat-channels/${params.id}/messages`
      const { data } = await this.$axios.get(url)
      context.commit('setMessages', data.data.data)
      return data.data
    } catch (error) {
      throw error
    }
  },

  async reactMessage (context, params) {
    try {
      const { data } = await this.$axios.post(`chat-messages/${params.id}/react`, params.data)
      return data.data
    } catch (error) {
      throw error
    }
  },
}
