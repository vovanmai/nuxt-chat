<template>
  <el-popover
    placement="top"
    v-model="visible"
  >
    <div class="emotions">
      <span @click="react(index)" v-for="(item, index) in emotions" :key="index">{{ item }}</span>
    </div>
    <div slot="reference">
      <el-tooltip
        class="select-emoji"
        effect="dark"
        :content="$t('express_emotion')"
        placement="right-start"
      >
        <div>
          <span>☹</span>
        </div>
      </el-tooltip>
    </div>
  </el-popover>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    id: {
      type: Number
    }
  },
  data() {
    return {
      visible: false,
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
    ...mapActions('message', ['reactMessage']),
    async react (type) {
      try {
        await this.reactMessage({
          id: this.id,
          data: {
            type: type,
          }
        })
        this.visible = false
      } catch (error) {
        this.visible = false
      }

    }
  },
}
</script>

<style lang="scss" scoped>
.select-emoji {
  font-size: 20px;
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    font-size: 25px;
  }
}

.emotions {
  span {
    font-size: 25px;
    margin-left: 5px;
    cursor: pointer;
    &:first-child {
      margin-left: 0px!important;
    }
  }
}
</style>
