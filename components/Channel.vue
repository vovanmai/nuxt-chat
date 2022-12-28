<template>
  <div :title="$t()" :class="['channel-item d-flex align-item-center']">
    <div class="d-flex align-item-center">
      <el-avatar class="avatar" :style="'background:' + sender?.color">{{ getAvatarName() }}</el-avatar>
    </div>

    <div :class="['user-info w-100 flex-1', totalUnread > 0 ? 'unread' : '' ]">
      <div class="user-name">{{ sender?.full_name }}</div>
      <div class="pre-message">{{ channel.last_message && channel.last_message.length > 14 ? (channel.last_message.substring(0, 14) + '...') : channel.last_message }}</div>
    </div>
    <div>
      <div class="time-ago">{{ $moment(channel.updated_at).fromNow() }}</div>
    </div>
    <div class="wrap-chat-active">
      <div v-show="sender?.active" class="chat-active"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    channel: {
      type: Object,
      default: {},
    },
    totalUnread: {
      type: Number,
      default: 0,
    }
  },
  computed: {
    sender() {
      const idAuth = this.$store.state.auth.user ? this.$store.state.auth.user.data.id : null

      if (idAuth) {
        if (this.channel.sender && this.channel.receiver) {
          if (this.channel.sender.id === idAuth) {
            return this.channel.receiver
          } else {
            return this.channel.sender
          }
        } else {

        }
      }
    }
  },
  data() {
    return {
      unreadTotal: 0
    }
  },
  methods: {
    ...mapActions('channel', ['getChannel']),
    getAvatarName() {
      return this.sender?.full_name.substring(0, 1)
    },
  },
  mounted() {

  },
  created() {
    this.$moment.locale(this.$i18n.locale)
  }
}
</script>

<style lang="scss" scoped>
  .channel-item {
    border-radius: 5px;
    padding: 5px;
    border-top: 1px solid #e5e6e9;
    border-left: 1px solid #e5e6e9;
    border-right: 1px solid #e5e6e9;
    &:hover {
      background: #ede9e9;
    }

    &.active {
      background: #ede9e9;
    }
    &:last-child {
      border-bottom: 1px solid #e5e6e9;
    }
    .avatar {
    }
    .user-info {
      padding-left: 10px;
      .user-name {
        color: black;
        font-size: 14px;
      }
      .pre-message {
        font-size: 13px;
        font-style: italic;
      }

      &.unread {
        font-weight: bold;
        color: black;
      }
    }
    .time-ago {
      font-size: 13px;
    }

    .wrap-chat-active {
      padding-left: 5px;
      .chat-active {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: #34cb34;
      }
    }
  }
</style>
