import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import tabnewsApi from '@/services/tabnews'
import { type News, NewsOrder } from '@/types/news'

export const useNewsStore = defineStore('news', () => {
  const allNews = ref<News[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string>('')
  const newsOrder = ref<NewsOrder>(NewsOrder.POPULAR)

  const news = computed(() => {
    let result = [...allNews.value]

    if (newsOrder.value === NewsOrder.BOOKMARK) {
      result = result.filter(item => item.bookmarked === true)
    }

    if (newsOrder.value === NewsOrder.RECENT) {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } else if (newsOrder.value === NewsOrder.POPULAR) {
      result.sort((a, b) => b.tabcoins - a.tabcoins)
    }

    return result
  })

  async function fetchNews() {
    loading.value = true
    try {
      const response = await tabnewsApi.get('', {
        params: {
          page: 1,
          per_page: 100
        }
      })
      allNews.value = response.data
    } catch (err) {
      error.value = `Erro ao carregar notícias: ${err}`
    } finally {
      loading.value = false
    }
  }

  function toggleBookmark(id: string) {
    const newsItem = allNews.value.find(item => item.id === id)
    if (newsItem) {
      newsItem.bookmarked = !newsItem.bookmarked
    }
  }

  function isBookmarked(id: string) {
    return allNews.value.find(item => item.id === id)?.bookmarked ?? false
  }

  function toggleOrder(order: NewsOrder) {
    newsOrder.value = order
  }

  return {
    news,
    loading,
    error,
    fetchNews,
    newsOrder,
    toggleOrder,
    toggleBookmark,
    isBookmarked,
  }
})
