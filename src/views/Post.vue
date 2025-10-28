<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { NewsPost } from '@/types/news'
import { tabnewsApi } from '@/services/tabnews'
import { marked } from 'marked'
import { useNewsStore } from '@/stores/news'
import { NewsOrder } from '@/types/news'
import { formatDate } from '@/utils/date'
import Error from '@/components/Error.vue'
import LoadingBar from '@/ui/LoadingBar.vue'
import Button from '@/ui/Button.vue'

const route = useRoute()
const user = route.params.user
const slug = route.params.slug

const newsStore = useNewsStore()

const post = ref<NewsPost | null>(null)
const loading = ref<boolean>(false)
const error = ref<string>('')

async function fetchData() {
  loading.value = true
  try {
    const response = await tabnewsApi.get(`/${user}/${slug}`)
    post.value = response.data
  } catch (err) {
    error.value = `Erro ao carregar dados da API: ${err}`
  } finally {
    loading.value = false
  }
}

function handleBookmark() {
  newsStore.toggleBookmark(post.value!.id)
}

onMounted(() => {
  newsStore.newsOrder = NewsOrder.DEFAULT;
  fetchData()
})
</script>

<template>
  <div class="news-post">
    <LoadingBar v-if="loading" />
    <Error v-if="error" />

    <article class="news-post-item" v-if="post">
      <div class="news-post__header">
        <h1 class="news-post__title">{{ post?.title }}</h1>
        <p class="news-post__info">
          por <span>{{ post?.owner_username }}</span> • {{ formatDate(new Date(post?.created_at)) }} • {{ post?.tabcoins }} {{ `${post?.tabcoins === 1 ? 'like' : 'likes'}` }}
        </p>
        <div class="news-post__actions">
          <Button
            :text="newsStore.isBookmarked(post?.id ?? '') ? 'Remover dos favoritos' : 'Salvar nos favoritos'"
            kind="bookmark"
            :status="newsStore.isBookmarked(post?.id ?? '') ? 'active' : ''"
            @click="handleBookmark"
          />
        </div>
      </div>
      <div class="news-post__content" v-html="marked(post?.body ?? '')" />
    </article>

  </div>
</template>

<style lang="scss">
  .news-post {
    padding: 2rem 0;

    &-item {
      animation: slideIn .4s var(--transition-effect) forwards;
      opacity: 0;
    }

    &__header {
      text-align: center;
      padding: 1.5rem 0 3rem;
    }

    &__title {
      font-size: var(--font-size-xxlarge);
      font-weight: bold;
      line-height: 1.3;
      text-wrap: balance;
      color: var(--color-brand-primary);
      text-align: center;

      @include phone {
        font-size: var(--font-size-xlarge);
      }
    }

    &__info {
      padding: 1rem 0;
      font-size: var(--font-size-base);
      font-weight: 600;
      color: var(--color-text);

      span {
        color: var(--color-dark);
        font-weight: 700;
      }
    }

    &__actions {
      display: flex;
      justify-content: center;
      padding: 1rem 0;
    }

    &__content {
      padding: 2rem 0;

      p, ul, ol, li {
        margin: 1rem 0;
        font-size: var(--font-size-base);
        font-weight: 500;
        color: var(--color-text);
      }

      ul, ol {
        margin-bottom: 3rem;
      }

      hr {
        margin: 3rem 0;
        border: 0;
        border-top: 1px solid #eee;
      }

      a {
        color: var(--color-brand-primary);
        font-weight: 600;
        text-decoration-thickness: .1em;
        text-underline-offset: .2em;
      }

      h1, h2, h3, h4, h5, h6 {
        margin: 2rem 0 1rem;
        font-weight: 700;
        color: var(--color-dark);
      }

      h1 {
        font-size: 2.6rem;
      }

      h2 {
        font-size: 2.4rem;
      }

      h3 {
        font-size: 2rem;
      }

      img {
        max-width: 100%;
        height: auto;
        margin: 1rem 0;
        border-radius: var(--radius-base);
      }

      pre {
        display: block;
        margin: 2rem 0;
        padding: 1rem 2rem;
        background-color: color-mix(in srgb, var(--color-brand-primary-light) 50%, transparent 50%);
        border-radius: var(--radius-base);
        overflow-x: auto;
        font-size: 1.4rem;
        font-weight: 500;

        code {
          color: var(--color-dark);
          font-family: monospace;
        }
      }
    }
  }
</style>
