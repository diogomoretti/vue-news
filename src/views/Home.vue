<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useNewsStore } from '@/stores/news'
import { NewsOrder } from '@/types/news'
import Error from '@/components/Error.vue'
import NewsItem from '@/components/NewsItem.vue'
import Button from '@/ui/Button.vue'
import { formatDate } from '@/utils/date'

const newsStore = useNewsStore()
const shouldAnimate = ref(true)

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

watch(() => newsStore.news, () => {
  shouldAnimate.value = false

  requestAnimationFrame(() => {
    shouldAnimate.value = true
    scrollToTop()
  })
}, { deep: true })

onMounted(() => {
  scrollToTop()
})
</script>

<template>
  <Error v-if="newsStore.error" />
  <div class="news-message-favorites" v-if="!newsStore.error &&newsStore.newsOrder === NewsOrder.BOOKMARK && newsStore.news.length === 0">
    <h2>Você ainda não tem nenhuma notícia salva :)</h2>
    <Button
      text="Ver notícias mais populares"
      @click="newsStore.toggleOrder(NewsOrder.POPULAR)"
    />
  </div>
  <ul class="news-list">
    <li
      class="news-list__item"
      v-for="(news, index) in newsStore.news"
      :key="news.id"
      :style="index < 10 ? { '--index': index } : {}"
      :class="{ 'animate': shouldAnimate && index < 10 }"
    >
      <NewsItem
        :id="news.id"
        :title="news.title"
        :username="news.owner_username"
        :date="formatDate(new Date(news.created_at))"
        :slug="news.slug"
        :likes="news.tabcoins"
        :bookmarked="news.bookmarked"
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .news-message-favorites {
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    animation: slideIn .4s var(--transition-effect) forwards;
    opacity: 0;

    h2 {
      text-align: center;
      font-size: var(--font-size-xlarge);
      font-weight: bold;
      line-height: 1.5;
      color: var(--color-brand-primary);

      @include phone {
        font-size: var(--font-size-large);
      }
    }
  }

  .news-list {
    list-style: none;
    padding: 2rem 0;

    &__item {
      margin-bottom: 2rem;

      &.animate {
        animation: slideIn .4s var(--transition-effect) forwards;
        animation-delay: calc(var(--index) * .08s);
        opacity: 0;
      }
    }
  }
</style>
