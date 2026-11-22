# Eremax — Quiz + Oferta (español)

Site estático (HTML/CSS/JS, sem build). Quiz e oferta são **independentes**: cada um tem sua própria pasta de CSS, JS e imagens.

```
/
├── index.html              → redireciona a raiz do domínio para /quiz/ (mantém UTMs)
├── quiz/
│   ├── index.html          → quiz de 16 etapas
│   ├── css/  base.css · quiz.css
│   ├── js/   config.js (o que você edita) · illustrations.js · quiz.js
│   └── images/             → step1-1.webp … (ver quiz/images/README.md)
└── oferta/
    ├── index.html          → página de produto (destino do "Enviar")
    ├── css/  base.css · oferta.css
    ├── js/   config.js (o que você edita) · illustrations.js · oferta.js
    ├── images/             → galeria, pacotes, ingredientes… (ver oferta/images/README.md)
    └── legal/              → termos, reembolso, privacidade, envio
```

## Antes de rodar
1. `oferta/js/config.js` → preços e `checkoutUrl` de cada pacote, `company` (rodapé), `reviews` reais, `ingredients`.
2. `customersCount` (nos dois configs), `successRate` (quiz) e `rating` (oferta) — só números comprováveis.
3. Imagens em `quiz/images/` e `oferta/images/`.
4. Políticas em `oferta/legal/`. Pixel / GTM / RedTrack no `<head>` de `quiz/index.html` e `oferta/index.html`.

UTMs e click-id passam do quiz → oferta → checkout.

## Deploy
Cloudflare Pages (sem build command, output `/`), Netlify, Vercel ou GitHub Pages.
