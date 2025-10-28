<template>
  <div class="error">
    <figure class="error__image">
      <picture>
        <source srcset="../assets/error.webp" type="image/webp">
        <img
          src="../assets/error.png"
          alt="Imagem de erro"
          loading="lazy"
          aria-describedby="error-image-description"
        >
      </picture>
      <figcaption id="error-image-description">
        Ocorreu um erro ao carregar as notícias.
      </figcaption>
    </figure>
    <h1 class="error__title">Ops! Algo deu errado.</h1>
    <p class="error__message">Tente novamente mais tarde.</p>
  </div>
</template>

<style lang="scss" scoped>
  .error {
    padding: 2rem 0;
    text-align: center;

    &__image {
      display: inline-block;
      margin-right: -2rem;

      figcaption {
        font-size: 0;
      }

      img,
      source {
        max-width: 16rem;
      }
    }

    &__title {
      font-size: var(--font-size-xlarge);
      font-weight: bold;
      color: var(--color-brand-primary);
    }

    &__message {
      font-size: var(--font-size-base);
      font-weight: 600;
      color: var(--color-text);
    }
  }
</style>
