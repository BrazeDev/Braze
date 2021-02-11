// God damn eslint not playing nicely with jest :(
/* eslint-disable no-undef */
import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import HeaderBar from './../../components/HeaderBar.vue'
import SideBar from './../../components/SideBar.vue'

describe('Components', () => {
  describe('HeaderBar', () => {
    const wrapper = shallowMount(HeaderBar, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    test('Has a properly initialised data function', () => {
      expect(typeof HeaderBar.data).toBe('function')
    })
    test('Sets up wrapper without error', () => {
      expect(wrapper.exists()).toBeTruthy()
    })
    test('Correctly displays version data', () => {
      expect(wrapper.html()).toContain('Braze.dev ' + require('~/metadata.json').version)
    })
  })
  describe('SideBar', () => {
    const wrapper = shallowMount(SideBar, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    test('Has a properly initialised data funcion', () => {
      // expect(typeof SideBar.data).toBe('function')
    })
    test('Sets up wrapper without error', () => {
      expect(wrapper.exists()).toBeTruthy()
    })
    test('All links are valid', () => {
      expect(wrapper.html).toMatch(/<NuxtLink to="\/"/)
      expect(wrapper.html).toMatch(/<NuxtLink to="\/mods"/)
      expect(wrapper.html).toMatch(/<NuxtLink to="\/packs"/)
      expect(wrapper.html).toMatch(/<NuxtLink to="\/settings"/)
    })
  })
})
