# Pokedex

Este projeto é uma Pokédex construída utilizando Vue 3, TypeScript e Vite. A aplicação consome dados da [PokeAPI](https://pokeapi.co/) e exibe uma lista de Pokémon, seus detalhes, além de permitir buscas e filtragens.

## Host na Vercel

https://vue-pokedex-eta.vercel.app/


## Instruções de Instalação

### 1. Clone o repositório

```
git clone https://github.com/keciakaroline/vue-pokedex.git
cd vue-pokedex
```

### 2. Instale as dependências

Antes de rodar o projeto, certifique-se de que você tem o Node.js instalado. Em seguida, instale as dependências necessárias com:

```
npm install
```

### 3. Execute a aplicação

Para rodar o projeto em modo de desenvolvimento, utilize o comando:

```
npm run dev
```

Acesse a aplicação no navegador através de http://localhost:3000.

### 4. Execute os testes

Este projeto utiliza Vitest para os testes unitários. Para rodar os testes, execute:

```
npm run test
```

## Funcionalidades Implementadas

- Listagem de Pokémon: Exibe uma lista de Pokémon com informações básicas como nome e ID.
- Filtro por tipo: Permite filtrar os Pokémon por tipos (água, fogo, grama, etc.).
- Busca por nome: Permite buscar Pokémon pelo nome.
- Detalhes dos Pokémon: Clicando em um Pokémon, você é redirecionado para uma página de detalhes que exibe informações como altura, peso, habilidades, e mais.
- Paginação: A lista de Pokémon é paginada, permitindo navegação entre as páginas.
- Carregamento e tratamento de erros: Indicadores de carregamento e mensagens de erro são exibidos ao buscar dados da API.
