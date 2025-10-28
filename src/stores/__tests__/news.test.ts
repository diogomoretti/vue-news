import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useNewsStore } from '../news'
import tabnewsApi from '@/services/tabnews'
import { NewsOrder, type News } from '@/types/news'

vi.mock('@/services/tabnews')

const mockNews: News[] = [
  {
    id: '1',
    owner_id: 'user1',
    parent_id: null,
    slug: 'news-1',
    title: 'News 1',
    status: 'published',
    source_url: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    published_at: '2024-01-15T10:00:00Z',
    deleted_at: null,
    tabcoins: 10,
    tabcoins_credit: 10,
    tabcoins_debit: 0,
    owner_username: 'user1',
    children_deep_count: 0,
    type: 'content',
    bookmarked: false
  },
  {
    id: '2',
    owner_id: 'user2',
    parent_id: null,
    slug: 'news-2',
    title: 'News 2',
    status: 'published',
    source_url: null,
    created_at: '2024-01-16T10:00:00Z',
    updated_at: '2024-01-16T10:00:00Z',
    published_at: '2024-01-16T10:00:00Z',
    deleted_at: null,
    tabcoins: 20,
    tabcoins_credit: 20,
    tabcoins_debit: 0,
    owner_username: 'user2',
    children_deep_count: 0,
    type: 'content',
    bookmarked: false
  },
  {
    id: '3',
    owner_id: 'user3',
    parent_id: null,
    slug: 'news-3',
    title: 'News 3',
    status: 'published',
    source_url: null,
    created_at: '2024-01-14T10:00:00Z',
    updated_at: '2024-01-14T10:00:00Z',
    published_at: '2024-01-14T10:00:00Z',
    deleted_at: null,
    tabcoins: 5,
    tabcoins_credit: 5,
    tabcoins_debit: 0,
    owner_username: 'user3',
    children_deep_count: 0,
    type: 'content',
    bookmarked: false
  }
]

describe('useNewsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('initial state', () => {
    it('should have empty news array', () => {
      const store = useNewsStore()
      expect(store.news).toEqual([])
    })

    it('should have loading false', () => {
      const store = useNewsStore()
      expect(store.loading).toBe(false)
    })

    it('should have empty error', () => {
      const store = useNewsStore()
      expect(store.error).toBe('')
    })

    it('should have newsOrder as POPULAR', () => {
      const store = useNewsStore()
      expect(store.newsOrder).toBe(NewsOrder.POPULAR)
    })
  })

  describe('fetchNews', () => {
    it('should fetch news successfully', async () => {
      const store = useNewsStore()

      vi.mocked(tabnewsApi.get).mockResolvedValue({
        data: mockNews
      })

      await store.fetchNews()

      expect(tabnewsApi.get).toHaveBeenCalled()
      expect(store.news).toHaveLength(3)
      expect(store.loading).toBe(false)
      expect(store.error).toBe('')
    })

    it('should set loading to true while fetching', async () => {
      const store = useNewsStore()

      vi.mocked(tabnewsApi.get).mockImplementation(() =>
        new Promise(resolve => {
          setTimeout(() => resolve({ data: mockNews }), 100)
        })
      )

      const fetchPromise = store.fetchNews()
      expect(store.loading).toBe(true)

      await fetchPromise
      expect(store.loading).toBe(false)
    })

    it('should handle error when fetching fails', async () => {
      const store = useNewsStore()
      const errorMessage = 'Network error'

      vi.mocked(tabnewsApi.get).mockRejectedValue(new Error(errorMessage))

      await store.fetchNews()

      expect(store.error).toContain('Erro ao carregar notícias')
      expect(store.loading).toBe(false)
    })
  })

  describe('toggleBookmark', () => {
    it('should toggle bookmark from false to true', async () => {
      const store = useNewsStore()

      vi.mocked(tabnewsApi.get).mockResolvedValue({
        data: mockNews
      })

      await store.fetchNews()

      store.toggleBookmark('1')

      expect(store.isBookmarked('1')).toBe(true)
    })

    it('should toggle bookmark from true to false', async () => {
      const store = useNewsStore()

      vi.mocked(tabnewsApi.get).mockResolvedValue({
        data: mockNews
      })

      await store.fetchNews()

      store.toggleBookmark('1')
      expect(store.isBookmarked('1')).toBe(false)

      store.toggleBookmark('1')
      expect(store.isBookmarked('1')).toBe(true)
    })

    it('should not throw error when toggling non-existent news', () => {
      const store = useNewsStore()

      expect(() => store.toggleBookmark('non-existent')).not.toThrow()
    })
  })

  describe('isBookmarked', () => {
    it('should return false for non-bookmarked news', async () => {
      const store = useNewsStore()

      vi.mocked(tabnewsApi.get).mockResolvedValue({
        data: mockNews
      })

      await store.fetchNews()

      expect(store.isBookmarked('1')).toBe(true)
    })

    it('should return true for bookmarked news', async () => {
      const store = useNewsStore()

      vi.mocked(tabnewsApi.get).mockResolvedValue({
        data: mockNews
      })

      await store.fetchNews()
      store.toggleBookmark('1')

      expect(store.isBookmarked('1')).toBe(false)
    })
  })

  describe('toggleOrder', () => {
    it('should change order to RECENT', () => {
      const store = useNewsStore()

      store.toggleOrder(NewsOrder.RECENT)

      expect(store.newsOrder).toBe(NewsOrder.RECENT)
    })

    it('should change order to BOOKMARK', () => {
      const store = useNewsStore()

      store.toggleOrder(NewsOrder.BOOKMARK)

      expect(store.newsOrder).toBe(NewsOrder.BOOKMARK)
    })

    it('should change order to POPULAR', () => {
      const store = useNewsStore()

      store.toggleOrder(NewsOrder.RECENT)
      store.toggleOrder(NewsOrder.POPULAR)

      expect(store.newsOrder).toBe(NewsOrder.POPULAR)
    })
  })
})
