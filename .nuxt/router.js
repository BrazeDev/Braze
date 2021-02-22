import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0cdcb892 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _b5e7e9d4 = () => interopDefault(import('../pages/mods/index.vue' /* webpackChunkName: "pages/mods/index" */))
const _dff0d46a = () => interopDefault(import('../pages/packs/index.vue' /* webpackChunkName: "pages/packs/index" */))
const _598bc5c5 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _2fea00a0 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _0cdcb892,
    name: "login"
  }, {
    path: "/mods",
    component: _b5e7e9d4,
    name: "mods"
  }, {
    path: "/packs",
    component: _dff0d46a,
    name: "packs"
  }, {
    path: "/register",
    component: _598bc5c5,
    name: "register"
  }, {
    path: "/",
    component: _2fea00a0,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
