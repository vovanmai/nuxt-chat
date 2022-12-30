<template>
  <div class="official-main d-flex flex-direction-column h-100">
    <div class="chat-header">
      <div class="chat-info">
        <div style="margin-right: 7px; cursor: pointer" @click="setShowSideBar(!showSideBar)">
          <i style="font-size: 18px" :class="showSideBar ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
        </div>
        <el-avatar class="avatar" :style="'background: ' + user?.color">{{ user && user.full_name ? user.full_name.substring(0, 1) : '' }}</el-avatar>
        <div class="name">{{ user && user.full_name }}</div>
        <div v-show="activeUserIds.includes(user?.id)" class="online"></div>
      </div>
    </div>
    <div class="chat-body flex-1" ref="messages">
      <infinite-loading spinner="spiral" direction="top" @infinite="infiniteHandler">
        <div slot="no-more">{{ $t('no_data') }}</div>
        <div slot="no-results">{{ $t('no_data') }}</div>
      </infinite-loading>
      <message
        v-for="(message, index) in messages"
        :chat-message="message"
        :receiver="user"
        :key="index"
      >
      </message>
    </div>
    <div class="chat-footer">
      <div class="input-message">
        <div v-show="typing" class="typing wave-text-animated text-left">
          <span v-for="(item, index) in messageTyping.split(' ')" :key="index">{{ item  + '&nbsp;' }}</span>
        </div>
        <div class="el-input d-flex">
          <input
            type="text"
            @keyup.enter="sendMessageToUser"
            @focus="isTyping(true)"
            @blur="isTyping(false)"
            :placeholder="$t('please_input')"
            v-model="message"
            class="el-input__inner">
          <el-button @click="sendMessageToUser" class="send-message d-flex align-item-center justify-center" type="success">
            <i class="el-icon-s-promotion"></i>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import Message from '@/components/Message'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'ChatId',
  middleware: ['authenticated'],
  // transition: 'fade-custom',
  layout: 'Main',
  components: {
    Message,
    InfiniteLoading
  },
  computed: {
    ...mapState('channel', ['channel', 'activeUserIds']),
    ...mapState('message', ['messages']),
    ...mapState(['showSideBar']),
  },
  data() {
    return {
      user: null,
      message: null,
      typing: false,
      messageTyping: '',
      params: {
        cursor: null
      }
    };
  },

  head() {
    return {
      title: 'Chat',
    }
  },
  methods: {
    ...mapMutations(['setShowSideBar']),
    ...mapActions('channel', ['getChannel', 'readChannel']),
    ...mapActions('message', ['sendMessage', 'getMessages']),
    ...mapMutations('message', ['resetMessages', 'setMessage', 'setReactMessage']),
    getUser() {
      const authId = this.$store.state.auth.user.data.id
      if (this.channel.sender.id === authId) {
        return this.channel.receiver
      } else {
        return this.channel.sender
      }
    },
    async sendMessageToUser() {
      if (this.message) {
        const data = {
          chat_channel_id: this.$route.params.id,
          message: this.message,
        }
        await this.sendMessage(data)
        this.message = null
      }
    },
    scrollToEndMessage() {
      let el = this.$refs['messages']
      el.scrollTop = el.scrollHeight
    },
    async infiniteHandler($state) {
      const data = await this.getMessages({
        id: this.$route.params.id,
        params: this.params
      })
      const params = data.next_page_url ? data.next_page_url.split('?') : []

      let cursor = null
      if (params.length == 2) {
        const queries = params[1] ? params[1].split('=') : []
        cursor = queries[1]
      }
      this.params.cursor = cursor
      if (cursor) {
        await $state.loaded();
      } else {
        await $state.complete();
      }
    },
    listenMessage() {
      this.$echo.private(`chat-to-channel-${this.$route.params.id}`)
        .on('send-message', (e) => {
          this.setMessage(e.message)
        });
    },
    listenReactMessage() {
      this.$echo.private(`react-in-${this.$route.params.id}`)
        .on('react-message', (e) => {
          this.setReactMessage(e.reactMessage)
        });
    },
    isTyping(typing) {
      const channel = this.$echo.private(`chat-to-channel-${this.$route.params.id}`)
      setTimeout(function() {
        channel.whisper('typing', {
            typing: typing
          });
      }, 1000)
    },
    listenForTyping() {
      this.$echo.private(`chat-to-channel-${this.$route.params.id}`)
        .listenForWhisper('typing', (e) => {
          this.typing = e.typing
        });
    },
  },
  async created() {
    const channelId = parseInt(this.$route.params.id)
    await this.getChannel(channelId)
    this.user = this.getUser()
    this.messageTyping =  this.user && this.user.full_name + ' ' + this.$t('typing') + '...'
  },
  mounted() {
    this.scrollToEndMessage()
    this.listenMessage()
    this.listenReactMessage()
    this.listenForTyping()
  },
  updated() {
    this.scrollToEndMessage()
  },
  destroyed() {
    this.resetMessages()
    this.$echo.leave(`chat-to-channel-${this.$route.params.id}`)
  }
}
</script>

<style lang="scss" scoped>
  .official-main {
    .chat-header {
      border-bottom: 1px solid #e5e6e9;
      .chat-info {
        padding: 7px 15px;
        display: flex;
        align-items: center;
        .name {
          font-weight: bold;
          padding-left: 8px;
        }
      }
    }
    .chat-body {
      padding: 10px 15px;
      overflow-y: scroll;
    }

    .chat-footer {
      border-top: 1px solid #e5e6e9;
      .input-message {
        width: 100%;
      }
      .typing {
        font-style: italic;
        color: #1890ff;
        font-size: 13px;
      }
      padding: 15px;
    }
  }
  .wave-text-animated {
    margin-top: 0.6em;
  }

  .wave-text-animated span {
    display: inline-block;
    -webkit-animation: wave-text 1s ease-in-out infinite;
    animation: wave-text 1s ease-in-out infinite;
  }

  .wave-text-animated span:nth-of-type(1) {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }
  .wave-text-animated span:nth-of-type(2) {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }
  .wave-text-animated span:nth-of-type(3) {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  .wave-text-animated span:nth-of-type(4) {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }
  .wave-text-animated span:nth-of-type(5) {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }

  @-webkit-keyframes wave-text {
    00% {
      transform: translateY(0em);
    }
    60% {
      transform: translateY(-0.6em);
    }
    100% {
      transform: translateY(0em);
    }
  }

  @keyframes wave-text {
    00% {
      transform: translateY(0em);
    }
    60% {
      transform: translateY(-0.6em);
    }
    100% {
      transform: translateY(0em);
    }
  }

  .send-message {
    width: 50px;
    margin-left: 10px;
  }

  .online {
    margin-left: 5px;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: #34cb34;
  }
</style>
