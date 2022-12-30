<template>
  <el-container class="main-layout h-100">
    <el-header class="d-flex align-item-center" :height="null">
      <div class="content-header container d-flex justify-between align-item-center">
        <div id="app-logo">
          <NuxtLink :to="localePath('chats')">
            <img class="app-image" src="~/assets/images/favicon.png" alt="">
            <span class="app-name">Chat Realtime</span>
          </NuxtLink>
          <span class="toggle-menu">
            <img src="~/assets/images/menu.svg" alt="">
          </span>
        </div>
        <div id="menu-nav">
<!--          <div class="menu-item">-->
<!--            <a @click="logout">{{ $t('logout') }}</a>-->
<!--          </div>-->
<!--          <div class="menu-item">
            <el-popover
              placement="bottom"
              width="40"
              trigger="hover">
              <a slot="reference">
                {{ $t('language') }}
                <i class="el-icon-arrow-down"></i>
              </a>
              <div @click="changeLanguage(item.value)" :class="['language', locale === item.value ? 'active' : '']" v-for="(item, index) in languages" :index="index">{{ $t(item.text) }}</div>
            </el-popover>
          </div>-->
<!--          <div class="menu-item">
            <el-popover
              placement="bottom"
              width="40"
              trigger="hover">
              <a slot="reference">
                <el-avatar style="background: red">{{ $store.state.auth.user?.data?.full_name.substring(0, 1) }}</el-avatar>
                <span style="margin-left: 7px">{{ $store.state.auth.user?.data?.full_name }}</span>
                <i style="margin-left: 7px" class="el-icon-arrow-down"></i>
              </a>
              <div @click="changeLanguage(item.value)" :class="['language', locale === item.value ? 'active' : '']" v-for="(item, index) in languages" :index="index">{{ $t(item.text) }}</div>
            </el-popover>
          </div>-->
          <div class="menu-item">
            <el-dropdown :hide-on-click="false">
              <span class="el-dropdown-link d-flex align-item-center">
                <el-avatar style="background: red">{{ $store.state.auth.user?.data?.full_name.substring(0, 1) }}</el-avatar>
                <span style="margin-left: 7px; color: #1890ff">{{ $store.state.auth.user?.data?.full_name }}</span>
                <i style="margin-left: 7px" class="el-icon-arrow-down"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout">{{ $t('logout') }}</el-dropdown-item>
                <el-dropdown-item @click.native="changeLanguage">{{ languages[locale == 'vi' ? 'en' : 'vi'] }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </el-header>
    <snow></snow>
    <el-container class="overflow-hidden">
      <side-bar v-if="showSideBar"></side-bar>
      <el-main class="overflow-hidden">
        <Nuxt></Nuxt>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import $ from 'jquery'
import SideBar from '@/components/layouts/SideBar'
import Snow from '@/components/Snow'
import {mapMutations, mapState} from "vuex";
import { remove, map } from 'lodash'

export default {
  name: 'MainLayout',
  transition: 'fade-custom',
  components: {
    SideBar,
    Snow
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      },
    };
  },
  data() {
    return {
      locale: this.$i18n.locale,
      languages: {
        en: 'English',
        vi: 'Vietnamese',
      }
    }
  },
  computed: {
    ...mapState('channel', ['activeUserIds']),
    ...mapState(['showSideBar']),
  },
  methods: {
    ...mapMutations('channel', ['setActiveUserForChannel', 'setInActiveUser', 'setActiveUsers', 'setActiveUser']),
    changeLanguage () {
      this.locale = this.locale == 'vi' ? 'en' : 'vi'
      this.$i18n.setLocale(this.locale)
      this.$moment.locale(this.locale)
    },
    async logout() {
      await this.$auth.logout()
      this.$notify({
        title: this.$i18n.t('success'),
        message: this.$i18n.t('logout_success'),
        type: 'success'
      });
      this.$router.push(this.localePath('login'))
    },
  },
  mounted() {
    $(".toggle-menu").click(function(){
      $("#menu-nav").slideToggle("slow")
    });

    const idAuth = this.$store.state.auth.user ? this.$store.state.auth.user.data.id : null
    this.$echo.join(`user-online`)
      .here((users) => {
        users = remove(users, function(item) {
          return item.id !== idAuth;
        });

        this.setActiveUsers(users)
      })
      .joining((user) => {
        this.setActiveUser(user)
        this.setActiveUserForChannel({
          user_id: user.id,
          active: true,
        })
      })
      .leaving((user) => {
        this.setInActiveUser(user)
        this.setActiveUserForChannel({
          user_id: user.id,
          active: false,
        })
      });
  },
  created() {
    this.$moment.locale(this.$i18n.locale)
  }
}
</script>

<style lang="scss" scoped>
body {
  overflow: hidden;
}
.main-layout {
  .el-header {
    box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
    padding: 8px 0px;
    .content-header {
      flex-direction: row;
      #menu-nav {
        display: flex;
        .menu-item {
          margin-left: 20px;
        }
      }
    }
    #app-logo {
      width: 20%;
      .app-image {
        height: 50px;
        width: 50px;
      }
      .toggle-menu {
        display: none;
      }
    }
  }

  .el-main {
    padding: 0px;
  }
}

.language {
  &.active {
    background: #1890ff;
    color: white;
  }
  margin-bottom: 5px;
  padding: 2px 5px;
  cursor: pointer;
  &:hover {
    background: #1890ff;
    color: white;
  }
}

@media only screen and (max-width: 768px) {
  .main-layout {
    .el-header {
      .content-header {
        flex-direction: column;
        #app-logo {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .toggle-menu {
            display: inline-block;
          }
        }
        #menu-nav {
          width: 100%;
          display: none;
          .menu-item {
            margin-bottom: 2px;
            margin-left: 0px;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
