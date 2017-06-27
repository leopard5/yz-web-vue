import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)


/**
 * 懒加载
 */
const home = r => require.ensure([], () => r(require('../page/home')), 'home')
const item = r => require.ensure([], () => r(require('../page/item')), 'item')
const activityList = r => require.ensure([], () => r(require('../page/activity/list.vue')), 'activityList')

export default new Router({
  routes: [
    {
      path: '/',
      component: App, //顶层路由，对应index.html
      children: [ //二级路由。对应App.vue
        {
          path: '',//地址为空时跳转home页面
          redirect: '/home'
        },
        {
          path: '/home',
          component: home
        },
        {
          path: '/item',
          component: item
        },
        {
          path: '/activityList',
          component: activityList
        }
      ]
    }
  ]
})
