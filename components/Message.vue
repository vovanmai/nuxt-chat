<template>
  <div class="message" :title="$t()">
    <div
      @mouseover="show(true)"
      @mouseleave="show(false)"
      class="item receiver d-flex align-item-center"
      v-if="chatMessage?.sender?.id !== $store.state.auth?.user?.data?.id"
    >
      <div class="d-flex align-item-center">
        <el-avatar size="small" style="background: #bb20c3">{{ receiver && receiver.full_name ? receiver.full_name.substring(0, 1) : '' }}
        </el-avatar>
      </div>
      <el-tooltip
        class="text-message"
        effect="dark"
        :content="$moment(chatMessage.created_at).format('dddd DD/MM/YYYY, HH:mm')"
        placement="left-start"
      >
        <div>
          <span v-if="chatMessage.react_message">
            {{ this.emotions[chatMessage.react_message.type] }}
          </span>
          {{ chatMessage.message }}
        </div>
      </el-tooltip>
      <react-emotion v-show="isShow" :id="chatMessage.id"></react-emotion>
    </div>
    <div v-else class="item sender d-flex align-item-center justify-end">
      <el-tooltip
        effect="dark"
        :content="$moment(chatMessage.created_at).format('dddd DD/MM/YYYY, HH:mm')"
        placement="left-start"
      >
        <div class="text-message">
          <span v-if="chatMessage.react_message">
            {{ this.emotions[chatMessage.react_message.type] }}
          </span>
          {{ chatMessage.message }}
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import ReactEmotion from '@/components/ReactEmotion'

export default {
  props: {
    chatMessage: Object,
    receiver: Object
  },
  components: {
    ReactEmotion
  },
  data() {
    return {
      isShow: false,
      emotions: {
        heart: '😍',
        tear: '😂',
        smile: '😃',
        sad: '😰',
      }
    }
  },
  created() {
  },
  methods: {
    show(isShow) {
      this.isShow = isShow
    }
  },
}
</script>
<style lang="scss" scoped>
  .message {
    margin-bottom: 20px;
    .text-message {
      padding: 10px;
      margin-left: 5px;
      border: 1px solid #d4d4d4;
      border-radius: 15px;
      background: #e4e6eb;
      word-break: break-all;
      max-width: 50%;
      position: relative;
      span {
        padding: 5px;
        position: absolute;
        right: 0px;
        bottom: -20px;
        font-size: 20px;
        color: white;
      }
    }
    .sender {
      .text-message {
        background: rgb(0, 132, 255);
        color: white;
        word-break: break-all;
        max-width: 50%;
      }
    }
  }
</style>
