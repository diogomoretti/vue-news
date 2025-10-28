<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Icon from '@/ui/Icon.vue'

defineProps<{
  id: string;
  title: string;
  username: string;
  date: string;
  slug: string;
  likes?: number;
  bookmarked?: boolean;
}>()
</script>

<template>
  <RouterLink
    class="news-item"
    :to="`/${username}/${slug}`"
    :aria-label="`${title} escrito por ${username} em ${date}`"
  >
    <h2 class="news-item__title">{{ title }}</h2>
    <p class="news-item__info">por <span>{{ username }}</span> • {{ date }} • {{ likes }} {{ `${likes === 1 ? 'like' : 'likes'}` }}</p>
    <span class="news-item__bookmark" v-if="bookmarked">
      <Icon name="bookmarkFilled" />
    </span>
  </RouterLink>
</template>

<style lang="scss" scoped>
  .news-item {
    position: relative;
    display: block;
    text-decoration: none;
    border: 2px solid var(--color-brand-primary-light);
    padding: 3rem;
    border-radius: var(--radius-large);
    transition: all 1s ease;

    &:hover {
      transition: all .3s ease;
      border-color: var(--color-brand-primary-light-2);
      box-shadow: 0 .5rem .5rem 0 rgba(0, 0, 0, .04);
    }

    &__title {
      font-size: var(--font-size-large);
      font-weight: bold;
      line-height: 1.3;
      text-wrap: balance;
      color: var(--color-brand-primary);
    }

    &__info {
      padding-top: .4rem;
      font-size: var(--font-size-small);
      font-weight: 600;
      color: var(--color-text);

      span {
        color: var(--color-dark);
        font-weight: 700;
      }
    }

    &__bookmark {
      position: absolute;
      top: 3rem;
      right: 3rem;
      color: var(--color-brand-primary);

      @include phone {
        top: -1px;
      }
    }
  }
</style>
