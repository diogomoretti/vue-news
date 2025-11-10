# Vue News

![Tests](https://github.com/diogomoretti/vue-news/actions/workflows/tests.yml/badge.svg) ![Vercel Deploy](https://deploy-badge.vercel.app/vercel/vue-news)

> [**Acessar ↗︎**](https://vue-news-one.vercel.app/)

🇧🇷 *Este Readme está em português.*

> [!NOTE]
> Este projeto tem apenas 1 commit (ou poucos) porque era um projeto privado. E quando foi aberto o repositório, foram zerados os commits.

## Tecnologias utilizadas

- [**Vue 3**](https://vuejs.org/): Como framework front-end principal. E utilizando a Composition API, que é mais usada atualmente.
- [**TypeScript**](https://www.typescriptlang.org/): Superset de JS, também padrão no mercado.
- [**Vite**](https://vite.dev/): Para o build do projeto. Também é um dos bundlers mais rápidos e leves atualmente.
- [**Pinia**](https://pinia.vuejs.org/): Para o gerenciamento de estado. É mais leve e fácil de usar que o Vuex, o que foi muito importante para o projeto. E também já é meio padrão atualmente.
- [**Vue Router**](https://router.vuejs.org/): Para a navegação entre as páginas.
- [**SASS**](https://sass-lang.com/): Como pré-processador de CSS.
- [**ESLint**](https://eslint.org/): Como linter de código.
- [**Vitest**](https://vitest.dev/): Como framework de testes.
- [**Conventional Commits**](https://www.conventionalcommits.org/): Como _pattern_ de commits.


## API de Notícias

A API de notícias utilizada foi do portal [Tabnews](https://www.tabnews.com.br) ([documentação](https://www.tabnews.com.br/GabrielSozinho/documentacao-da-api-do-tabnews#gabrielsozinho-content-d)), já que é um site com notícias em português.

Como a API tinha problema de CORS, foi necessário criar um proxy para acessar a API.

- **Proxy local**: Está no arquivo `vite.config.ts`, servido via Vite.
- **Proxy Vercel**: Como subi o projeto na Vercel, criei um proxy no arquivo `/api/index.js`, que será servido via Vercel Functions (serverless).

**API Original do Tabnews:** [Listagem de notícias](https://www.tabnews.com.br/api/v1/contents?page=1&per_page=100) • [Notícia single](https://www.tabnews.com.br/api/v1/contents/bgabraga/ja-construi-um-saas-antes-e-nao-documentei-nada-dessa-vez-vai-ser-diferente)

## Arquitetura do projeto

### System Design

<img width="838" height="440" alt="system-design" src="https://github.com/user-attachments/assets/5293dc6a-fba5-4c9d-a41e-e171876f4353" />


### Estrutura de pastas

```
vue-news/
├── api/      # Proxy para a API de notícias
├── public/   # Arquivos estáticos
├── src/      # Código do projeto
|   ├── assets/      # Arquivos estáticos (imagens, etc...)
|   ├── components/  # Componentes um pouco maiores (como o Menu, por exemplo)
|   ├── router/      # Rotas
|   ├── services/    # Serviços e configurações para acessar a API
|   ├── stores/      # Gerenciamento de estado (Pinia)
|   ├── styles/      # Estilos globais (SASS)
|   ├── types/       # Tipos, principalmente para as entidades (TypeScript)
|   ├── ui/          # Componentes menores e a maioria das vezes stateless (como o Icon, LoadingBar, Button, etc...)
|   ├── utils/       # Funções utilitárias (formatar data, etc...)
|   ├── views/       # Páginas das rotas (como a Home e a Single Post)
|   ├── App.vue      # Componente principal (header, main...)
|   ├── main.ts      # Arquivo de entrada da aplicação e configurações do Vue
```

### Naming conventions

- **Nome dos componentes**: CamelCase
- **Nome dos arquivos**: kebab-case

Uma decisão que tomei foi utilizar **File Naming** (ex: `Home.vue`, `NewsItem.vue`, etc...) ao invés de **Directory Naming** (ex: `home/index.vue`, `news-item/index.vue`, etc...), pois nesse tamanho de projeto, não tem muita necessidade de utilizar Directory Naming.

### CI de testes

Aqui estou utilizando o [Github Actions](https://github.com/features/actions) para rodar os testes unitários.

### CI de deploy

Aqui estou utilizando a [Vercel](https://vercel.com/) para deploy do projeto e da Serverless Function (API).

## Como rodar o projeto

Aqui estou utilizando o [pnpm](https://pnpm.io/) como gerenciador de pacotes, mas você pode usar NPM, Yarn ou Bun.

### Instalar as dependências

```sh
pnpm install
```

### Executar o projeto em modo de desenvolvimento (localhost)

```sh
pnpm dev
```

### Build do projeto para produção

```sh
pnpm build
```

### Executar os testes unitários

```sh
pnpm test:unit
```

## Algumas decisões que tomei

- **Utilização de SASS para o estilo das páginas**: A princípio tinha feito tudo com CSS puro, porém resolvi adicionar o SASS para ajudar em duas coisinhas: "Naming Nesting" para facilitar na escrita do BEM e a utilização de variáveis do SASS para o responsivo, já que as variáveis CSS não funcionam com @media-queries.
- **Vercel e não Github Pages:** Vercel mais pela facilidade do CI com o Github e também porque consigo usar Serverless Function direto no projeto (como citei acima na parte da API).
- **Cache de Notícias:** Usando o Pinia, como Store, estou usando apenas cache em memória. Navegando nas abas, se comporta como um SPA tradicional. Optei por não usar persistência em localStorage ou usando alguma lib como [Tanstack Query](https://tanstack.com/query/latest). 
- **Notícia Single (Post):** A cada vez que você entra numa notícia, é feito o request para essa notícia na API.
- **Adicionar a notícia nos favoritos:** Aqui tinham várias formas de fazer, desde salvar num array na store separado ou persistir no localStorage. Essas duas maneiras eu teria que salvar (e duplicar) os metadados nesse array (titulo, likes..), sendo que likes podem mudar, por exemplo. ***O que fiz foi:*** Ao adicionar o artigo nos favoritos, ele acha o ID na lista e adiciona um campo chamado `bookmarked` como `true`.
