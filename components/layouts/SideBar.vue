<template>
  <el-aside :title="$t()" class="side-bar d-flex flex-direction-column" width="300px">
<!--    <div style="background: darkseagreen; padding: 20px" class="side-bar-info">-->
<!--      555555-->
<!--    </div>-->
    <div class="channels flex-1">
      <channel
        v-for="(channel, index) in channels"
        @click.native="selectChannel(channel.id, getUnreadTotal(channel))"
        :channel="channel"
        :totalUnread="getUnreadTotal(channel)"
        :key="index"
        :class="selectChannelId === channel.id ? 'active' : ''"
      ></channel>
      <infinite-loading @infinite="infiniteHandler">
        <div slot="no-more">{{ $t('no_data') }}</div>
        <div slot="no-results">{{ $t('no_data') }}</div>
      </infinite-loading>
    </div>
  </el-aside>
</template>

<script>
import Channel from "@/components/Channel"
import { mapActions, mapMutations, mapState } from "vuex"
import InfiniteLoading from 'vue-infinite-loading'
import { find } from 'lodash'

export default {
  components: {
    Channel,
    InfiniteLoading
  },
  data() {
    return {
      selectChannelId: null,
      nextPage: null,
    }
  },
  computed: {
    ...mapState('channel', ['channels'])
  },
  methods: {
    ...mapActions('channel', ['getChannels', 'readChannel']),
    ...mapMutations('channel', ['resetChannels']),
    ...mapMutations('channel', ['addChannel']),
    async selectChannel(id, totalUnread) {
      if (totalUnread) {
        await this.readChannel(id)
      }
      this.selectChannelId = id
      this.$router.push(this.localePath({ name: 'chats-id', params: { id } }));
    },
    async infiniteHandler($state) {
      const data = await this.getChannels(this.nextPage)
      this.nextPage = data.next_page_url
      if (data.next_page_url) {
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    getUnreadTotal(channel) {
      const authId = this.$store.state.auth.user ? this.$store.state.auth.user.data.id : null
      if (authId) {
        const value = find(channel.unread_message_total, (item) => { return item.user_id === authId })
        return value ? value.number_of_unread : 0
      }
      return 0
    }
  },
  mounted() {
    const userLoginId = this.$store.state.auth.user.data.id
    this.$echo.private(`chat-user-${userLoginId}`)
      .on('send-message', (e) => {
        this.addChannel(e.channel)
      });
  },
  async created() {
    this.resetChannels()
    this.selectChannelId = parseInt(this.$route.params.id)

    const routeName = this.$route.name.substring(0, 8)

    if (routeName === 'chats-id') {
      await this.readChannel(this.$route.params.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .side-bar {
    border-right: 1px solid #d4d4d4;
    .channels {
      padding: 5px;
      overflow-y: auto;
      cursor: pointer;
    }
  }

  .waveTextAnimated {
    margin-top: 0.6em;
    font-size: 50px;
    text-align: center;
  }
</style>
