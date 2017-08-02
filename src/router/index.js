import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Member from '@/components/Member'
import Test from '@/components/Test'
import Call from '@/components/Call'
import Components from '@/components/Components'
import NotFound from '@/components/NotFound'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/member',
      name: 'Member',
      component: Member,
      meta: {
        title: '成员'
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
      meta: {
        title: '测试'
      }
    },
    {
      path: '/call',
      name: 'Call',
      component: Call,
      meta: {
        title: '拨打电话'
      }
    },
    {
      path: '/components',
      name: 'Components',
      component: Components,
      meta: {
        title: '组件'
      }
    },
    {
      path: '*',
      component: NotFound,
      meta: {
        title: '找不到页面'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
