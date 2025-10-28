<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { useNewsStore } from '@/stores/news'
import { NewsOrder } from '@/types/news'
import Menu from '@/components/Menu.vue'
import LoadingStripe from '@/ui/LoadingStripe.vue'
import Logo from '@/ui/Logo.vue'

const newsStore = useNewsStore()

onMounted(() => {
  newsStore.fetchNews()
})
</script>

<template>
  <header class="header">
    <div class="header-logo">
      <h1 class="header-logo__title">
        <RouterLink to="/" @click="newsStore.toggleOrder(NewsOrder.POPULAR)">
          <Logo />
        </RouterLink>
      </h1>
    </div>

    <nav role="navigation" class="header-nav">
      <Menu />
    </nav>
  </header>

  <main class="main">
    <LoadingStripe v-if="newsStore.loading" />
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
  .header {
    position: sticky;
    display: flex;
    top: 0;
    z-index: 20;
    justify-content: space-between;
    align-items: center;
    padding: 3rem 0 1rem;
    background-color: var(--color-background);

    &:after {
      content: '';
      position: absolute;
      top: 100%;
      left: -5%;
      width: 110%;
      height: 5rem;
      background: linear-gradient(to bottom, var(--color-background) 10%, transparent);
    }

    &-logo__title {
      max-width: 16rem;
      margin-bottom: -.5rem;

      a {
        text-decoration: none;
      }
    }

    &-nav {
      flex: 1;
      display: flex;
      justify-content: flex-end;

      @include phone {
        padding-top: 2rem;
      }
    }

    @include phone {
      flex-direction: column;
      padding: 1rem 0;
    }
  }

  .main {
    padding-top: 2rem;
  }
</style>
