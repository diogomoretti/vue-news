import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import NewsItem from '../NewsItem.vue'
import Icon from '@/ui/Icon.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/:username/:slug', name: 'post', component: { template: '<div>Post</div>' } }
  ]
})

describe('NewsItem', () => {
  describe('rendering', () => {
    it('should render the news item with all required props', () => {
      const wrapper = mount(NewsItem, {
        props: {
          id: '1',
          title: 'Test Article',
          username: 'testuser',
          date: '15/10/2024',
          slug: 'test-article',
          likes: 5
        },
        global: {
          plugins: [router]
        }
      })

      expect(wrapper.find('.news-item').exists()).toBe(true)
      expect(wrapper.find('.news-item__title').text()).toBe('Test Article')
    })
  })

  describe('content display', () => {
    it('should display the article title', () => {
      const wrapper = mount(NewsItem, {
        props: {
          id: '1',
          title: 'Amazing Article Title',
          username: 'testuser',
          date: '15/10/2024',
          slug: 'amazing-article',
          likes: 10
        },
        global: {
          plugins: [router]
        }
      })

      expect(wrapper.find('.news-item__title').text()).toBe('Amazing Article Title')
    })
  })

  describe('likes formatting', () => {
    it('should display "like" in singular when likes is 1', () => {
      const wrapper = mount(NewsItem, {
        props: {
          id: '1',
          title: 'Test Article',
          username: 'testuser',
          date: '15/10/2024',
          slug: 'test-article',
          likes: 1
        },
        global: {
          plugins: [router]
        }
      })

      const info = wrapper.find('.news-item__info')
      expect(info.text()).toContain('1 like')
    })

    it('should display "likes" in plural when likes is 0', () => {
      const wrapper = mount(NewsItem, {
        props: {
          id: '1',
          title: 'Test Article',
          username: 'testuser',
          date: '15/10/2024',
          slug: 'test-article',
          likes: 0
        },
        global: {
          plugins: [router]
        }
      })

      const info = wrapper.find('.news-item__info')
      expect(info.text()).toContain('0 likes')
    })

    it('should display "likes" in plural when likes is greater than 1', () => {
      const wrapper = mount(NewsItem, {
        props: {
          id: '1',
          title: 'Test Article',
          username: 'testuser',
          date: '15/10/2024',
          slug: 'test-article',
          likes: 100
        },
        global: {
          plugins: [router]
        }
      })

      const info = wrapper.find('.news-item__info')
      expect(info.text()).toContain('100 likes')
    })
  })

  describe('bookmark icon', () => {
    it('should not display bookmark icon when bookmarked is false', () => {
      const wrapper = mount(NewsItem, {
        props: {
          id: '1',
          title: 'Test Article',
          username: 'testuser',
          date: '15/10/2024',
          slug: 'test-article',
          likes: 5,
          bookmarked: false
        },
        global: {
          plugins: [router],
          stubs: {
            Icon
          }
        }
      })

      expect(wrapper.find('.news-item__bookmark').exists()).toBe(false)
    })

    it('should display bookmark icon when bookmarked is true', () => {
      const wrapper = mount(NewsItem, {
        props: {
          id: '1',
          title: 'Test Article',
          username: 'testuser',
          date: '15/10/2024',
          slug: 'test-article',
          likes: 5,
          bookmarked: true
        },
        global: {
          plugins: [router],
          stubs: {
            Icon
          }
        }
      })

      expect(wrapper.find('.news-item__bookmark').exists()).toBe(true)
    })
  })
})

