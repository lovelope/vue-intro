import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Member from '@/components/Member'
import Test from '@/components/Test'
import Call from '@/components/Call'
import Components from '@/components/components'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/member',
      name: 'Member',
      component: Member
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/call',
      name: 'Call',
      component: Call
    },
    {
      path: '/components',
      name: 'Components',
      component: Components
    }
  ]
})
