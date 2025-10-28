<template>
  <div class="loading-bar"></div>
</template>

<style scoped>
  .loading-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 100%;
    z-index: 1000;
    background-color: var(--color-brand-primary);
    box-shadow: 0 5px 4px 0 var(--color-brand-primary-light);
    animation: loadingAnimation 1s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;
  }

  @keyframes loadingAnimation {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
</style>
