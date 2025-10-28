<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useNewsStore } from '@/stores/news'
import { NewsOrder } from '@/types/news'

const newsStore = useNewsStore()

function toggleOrder(order: NewsOrder) {
  newsStore.toggleOrder(order)
}
</script>

<template>
  <ul class="header-menu">
    <li>
      <RouterLink
        to="/"
        tabindex="0"
        @click="toggleOrder(NewsOrder.POPULAR)"
        :class="{ 'active': newsStore.newsOrder === NewsOrder.POPULAR }"
        :aria-current="newsStore.newsOrder === NewsOrder.POPULAR ? 'page' : undefined"
        aria-label="Populares"
      >
        Populares
      </RouterLink>
    </li>
    <li>
      <RouterLink
        to="/"
        tabindex="0"
        @click="toggleOrder(NewsOrder.RECENT)"
        :class="{ 'active': newsStore.newsOrder === NewsOrder.RECENT }"
        :aria-current="newsStore.newsOrder === NewsOrder.RECENT ? 'page' : undefined"
        aria-label="Recentes"
      >
        Recentes
      </RouterLink>
    </li>
    <li>
      <RouterLink
        to="/"
        tabindex="0"
        @click="toggleOrder(NewsOrder.BOOKMARK)"
        :class="{ 'active': newsStore.newsOrder === NewsOrder.BOOKMARK }"
        :aria-current="newsStore.newsOrder === NewsOrder.BOOKMARK ? 'page' : undefined"
        aria-label="Favoritos"
      >
        Favoritos
      </RouterLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .header-menu {
    display: flex;
    gap: .5rem;
    list-style: none;
    padding: 0;

    a {
      display: inline-block;
      padding: .5em 1em;
      border-radius: 3rem;
      font-size: 1.4rem;
      font-weight: bold;
      color: var(--color-text);
      text-decoration: none;
      cursor: pointer;
      transition: color .4s ease, background-color .5s ease;

      &:hover {
        color: var(--color-brand-primary);
        background-color: var(--color-brand-primary-light);
      }

      &.active {
        color: var(--color-brand-primary);
        background-color: var(--color-brand-primary-light-2);
      }
    }
  }
</style>
