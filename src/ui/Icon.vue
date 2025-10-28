<script setup lang="ts">
import { computed } from 'vue'
import { icons, type IconName } from '@/utils/icons'

type IconSize = 'small' | 'medium' | 'large'

interface IconProps {
  name: IconName
  color?: string
  size?: IconSize
}

const props = withDefaults(defineProps<IconProps>(), {
  color: 'currentColor',
  size: 'medium',
})

const iconSvg = computed(() => icons[props.name])
</script>

<template>
  <span
    :class="['icon', `icon--${size}`]"
    :style="{ color: color }"
    v-html="iconSvg"
  ></span>
</template>

<style lang="scss" scoped>
  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &--small {
      max-width: 1.2rem;
    }

    &--medium {
      max-width: 1.6rem;
    }

    &--large {
      max-width: 2rem;
    }

    & :deep(svg) {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
  }
</style>
