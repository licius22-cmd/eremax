# Eremax — Quiz Funnel (español)

Funil de quiz estático (HTML/CSS/JS, sem build) em espanhol, no mesmo layout do quiz de referência: fundo bege, dourado,
barra Black Friday com contador de 2h por visitante, 16 etapas, resumo do perfil, gráfico de 12 semanas e etapa final
com 3 pop-ups Sí/No antes do botão **Enviar**, que redireciona para a oferta.

## Arquivos
- `index.html` — o quiz
- `offer.html` — página de oferta (3 pacotes, garantia, FAQ) — destino padrão do Enviar
- `config.js` — **tudo que você edita**: marca, número de clientes, % de sucesso, link de redirect, imagens, pacotes/preços/checkout
- `assets.js` — ilustrações e ícones padrão (aparecem enquanto as imagens não existem)
- `script.js` / `style.css` — lógica e design
- `images/` — suas imagens (veja `images/README.md`)
- `legal/` — políticas (modelos para preencher)

## Antes de rodar
1. `config.js` → `redirectUrl`, `packages[].checkoutUrl` e preços.
2. `config.js` → `customersCount` e `successRate`.
3. Imagens em `images/`.
4. Políticas em `legal/`.
5. Pixel / GTM / RedTrack no `<head>` do `index.html` e do `offer.html`.

Parâmetros UTM e click-id da URL do quiz são repassados para o redirect e para todos os links de checkout.

## Eventos (dataLayer + fbq)
`quiz_step_view`, `quiz_answer`, `quiz_complete`, `quiz_submit`, `checkout_click` (+ `InitiateCheckout` da Meta na oferta).

## Deploy
Cloudflare Pages (sem build command, output `/`), Netlify, Vercel ou GitHub Pages.
