import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('Button', () => {
  describe('rendering', () => {
    it('should render a button with text', () => {
      const wrapper = mount(Button, {
        props: {
          text: 'Click me'
        }
      })

      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.text()).toContain('Click me')
    })

    it('should have the "button" class', () => {
      const wrapper = mount(Button, {
        props: {
          text: 'Test'
        }
      })

      expect(wrapper.find('button').classes()).toContain('button')
    })
  })

  describe('bookmark icon', () => {
    it('should not render any icon when kind is not provided', () => {
      const wrapper = mount(Button, {
        props: {
          text: 'No icon'
        }
      })

      expect(wrapper.findComponent({ name: 'Icon' }).exists()).toBe(false)
    })
  })

  describe('status', () => {
    it('should not have "active" class when status is not provided', () => {
      const wrapper = mount(Button, {
        props: {
          text: 'Normal'
        }
      })

      expect(wrapper.find('button').classes()).not.toContain('active')
    })

    it('should have "active" class when status is "active"', () => {
      const wrapper = mount(Button, {
        props: {
          text: 'Active',
          status: 'active'
        }
      })

      expect(wrapper.find('button').classes()).toContain('active')
    })
  })
})

