import Vue from 'vue'
import Antd from 'ant-design-vue/lib'

Vue.use(Antd)


Vue.directive('substring', {
  // eslint-disable-next-line require-jsdoc
  inserted(el, { arg}) {
    el.addEventListener('input', () => {
      const value = el.children[0].value.trim()
      el.children[0].value = value.length >= arg ? value.substring(0, arg) : value
    })
  }
})
