<script setup lang="ts">
const LINES: number = 10
const linesArr = Array.from({ length: LINES }, (_, index) => index)
</script>

<template>
  <div class="loading-news">
    <div class="loading-news__item" v-for="line in linesArr" :key="line"></div>
  </div>
</template>

<style lang="scss" scoped>
  .loading-news {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-top: 3rem;

    &__item {
      width: 100%;
      height: 12rem;
      background-color: #f5f5f5;
      opacity: .3;
      border-radius: var(--radius-large);
      animation: loading .2s ease-in-out infinite alternate;
    }
  }

  @keyframes loading {
    0% {
      opacity: .3;
    }
    100% {
      opacity: .7;
    }
  }
</style>
