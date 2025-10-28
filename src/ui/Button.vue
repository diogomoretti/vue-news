<script setup lang="ts">
import Icon from '@/ui/Icon.vue'

defineProps<{
  text: string,
  kind?: 'bookmark',
  status?: 'active' | ''
}>()
</script>

<template>
  <button
    class="button"
    :class="{ 'active': status === 'active' }"
    :aria-label="text"
  >
    <Icon v-if="kind === 'bookmark' && status !== 'active'" name="bookmark" size="small" />
    <Icon v-if="kind === 'bookmark' && status === 'active'" name="bookmarkFilled" size="small" />
    {{ text }}
  </button>
</template>

<style lang="scss" scoped>
  .button {
    padding: .6em 1.2em;
    font-size: var(--font-size-small);
    font-family: var(--font-family);
    font-weight: bold;
    color: var(--color-brand-primary);
    border: 1px solid var(--color-brand-primary);
    border-radius: var(--radius-large);
    background-color: transparent;
    cursor: pointer;
    transition: all .3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5em;

    svg {
      max-width: 1.2rem;
      width: 100%;
      height: auto;
      fill: var(--color-brand-primary);
      transition: all .3s ease;
    }

    &:hover {
      background-color: var(--color-brand-primary-light);
    }

    &.active {
      animation: bump .3s var(--transition-effect);
      background-color: var(--color-brand-primary-light-2);
    }
  }

  @keyframes bump {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
</style>
