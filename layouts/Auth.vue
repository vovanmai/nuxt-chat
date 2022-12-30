<template>
  <div class="auth-page">
    <snow></snow>
    <el-container>
      <el-header :height="null">
        <div class="container">
          <nav id="navigation">
            <div class="logo-app w-100">
              <a href="/login" class="logo">
                <img class="app-image" src="~/assets/images/favicon.png" alt="">
                <span class="app-name">Chat App</span>
              </a>
              <span id="nav-toggle">
                <img src="~/assets/images/menu.svg" alt="">
              </span>
            </div>
            <div id="menu-left" class="w-100">
              <div class="menu-item">
                <NuxtLink :to="localePath('login')">{{ $t('login') }}</NuxtLink>
              </div>
              <div class="menu-item">
                <NuxtLink :to="localePath('register')">{{ $t('register') }}</NuxtLink>
              </div>
              <div class="menu-item">
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
              </div>
            </div>
          </nav>
        </div>
      </el-header>
      <el-main>
        <Nuxt></Nuxt>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import $ from 'jquery'
import Snow from '../components/Snow'
export default {
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      },
    };
  },
  components: {
    Snow
  },
  data() {
    return {
      locale: this.$i18n.locale,
      languages: [
        {
          value: 'en',
          text: 'english',
        },
        {
          value: 'vi',
          text: 'vietnamese',
        },
      ]
    }
  },
  methods: {
    changeLanguage (value) {
      this.$i18n.setLocale(value)
      this.locale = value
      this.$moment.locale(value)
    }
  },
  mounted() {
    $("#nav-toggle").click(function(){
      $("#menu-left").slideToggle("slow");
    });
  },
  created() {
    this.$moment.locale(this.$i18n.locale)
  }
}
</script>

<style lang="scss" scoped>
body {
  overflow: auto;
}
.auth-page {
  .el-main {
    padding: 15px;
  }
  .el-header {
    padding: 10px 0px;
    box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
    #navigation {
      display: flex;
      align-items: center;
      flex-direction: row;
      .logo-app {
        flex: 40%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .logo {
          display: flex;
          align-items: center;
          .app-image {
            height: 50px;
            width: 50px;
          }
          .app-name {
            padding-left: 10px;
            font-size: 25px;
          }
        }
        #nav-toggle {
          display: none;
          border: 1px solid #afa9a9;
        }
      }
      #menu-left {
        text-align: right;
        .menu-item {
          margin-left: 15px;
          display: inline-block;
        }
      }
    }
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
  #navigation {
    flex-direction: column !important;
    .logo-app {
      #nav-toggle {
        display: inline-block !important;
      }
    }
    #menu-left {
      display: none;
      .menu-item {
        margin-left: 0px !important;
        display: block !important;
        text-align: left !important;
        padding: 2px 0px;
      }
    }
  }
}
</style>
