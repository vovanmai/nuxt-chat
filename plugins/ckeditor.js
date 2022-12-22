import Vue from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue2';
Vue.use(CKEditor);

Vue.directive("log", {
  bind(el, bind, vnode) {},
  inserted: function(el, bind, vnode) {},
  update: (el, bind, vnode, oldVnode) => {},
  componentUpdated: function(el, bind, vnode, oldVnode) {},
  unbind: function(el, bind, vnode) {}
});
