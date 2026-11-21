# Eremax — Funil Quiz + Oferta (español)

Site estático (HTML/CSS/JS, sem build).

```
/
├── index.html            → redireciona a raiz do domínio para /quiz/ (mantém UTMs)
├── quiz/index.html       → quiz de 16 etapas
├── oferta/index.html     → página de produto/oferta (destino do botão "Enviar")
├── legal/                → termos, reembolso, privacidade, envio
└── assets/
    ├── css/  base.css (compartilhado) · quiz.css · oferta.css
    ├── js/   config.js (TUDO que você edita) · illustrations.js · quiz.js · oferta.js
    └── images/
        ├── quiz/     idades, ícones, prova social, transformação, perfil
        └── oferta/   galeria, pacotes, supplement facts, ingredientes
```

## Antes de rodar
1. `assets/js/config.js` → preços e `checkoutUrl` de cada pacote em `oferta.bundles`.
2. `customersCount`, `successRate`, `oferta.rating` — só números comprováveis.
3. `oferta.reviews` → avaliações reais de clientes (enquanto vazio, aparecem espaços para preencher).
4. `oferta.expert` → só se tiver um especialista real que aprovou o produto (senão a seção fica oculta).
5. `oferta.ingredients` → ajuste à sua fórmula. `oferta.company` → dados da empresa no rodapé.
6. Imagens → veja `assets/images/README.md`.
7. Políticas em `legal/`. Pixel / GTM / RedTrack no `<head>` de `quiz/index.html` e `oferta/index.html`.

UTMs e click-id passam do quiz → oferta → checkout.

## Eventos (dataLayer / fbq)
Quiz: `quiz_step_view`, `quiz_answer`, `quiz_complete`, `quiz_submit` · Oferta: `offer_view`, `bundle_select`, `checkout_click` (+ `InitiateCheckout`).

## Deploy
Cloudflare Pages (sem build command, output `/`), Netlify, Vercel ou GitHub Pages.
