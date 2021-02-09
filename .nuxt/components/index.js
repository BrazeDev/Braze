export { default as HeaderBar } from '../../components/HeaderBar.vue'
export { default as SideBar } from '../../components/SideBar.vue'

export const LazyHeaderBar = import('../../components/HeaderBar.vue' /* webpackChunkName: "components/header-bar" */).then(c => c.default || c)
export const LazySideBar = import('../../components/SideBar.vue' /* webpackChunkName: "components/side-bar" */).then(c => c.default || c)
