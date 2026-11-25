# AGENTS.md

Especificações gerais do projeto para orientar agentes de IA (Claude Code e outros) neste repositório.

## Stack

- **Next.js** (App Router) com **React**, em **JavaScript** (sem TypeScript).
- Dependências mínimas: evitar adicionar bibliotecas sem necessidade.
- CSS puro em `app/globals.css` (sem Tailwind, CSS Modules ou styled-components).
- Ambiente de desenvolvimento: GitHub Codespaces (`next.config.mjs` libera `*.app.github.dev` em `allowedDevOrigins`).

## Comandos

```bash
npm run dev     # servidor de desenvolvimento
npm run build   # build de produção
npm run start   # servir o build
```

## Convenções

- **Idioma:** tudo em português do Brasil — textos da interface, nomes de variáveis, funções e classes CSS, comentários e mensagens de commit.
- **Ilustrações:** desenhos em SVG inline feitos à mão; nada de imagens externas.
- **Animações:** preferir transições/animações CSS (`transform`, `scale`, `opacity`) acionadas por classes, em vez de animar via JavaScript.
- **Acessibilidade:** elementos clicáveis que não são botões nativos recebem `role="button"`, `tabIndex={0}` e respondem a Enter/Espaço; SVGs têm `aria-label` descritivo.
- **Layout:** responsivo, funcionando bem em telas de celular.
