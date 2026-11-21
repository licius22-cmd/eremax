# Imagens — onde colocar cada uma

Envie os arquivos com **exatamente** estes nomes. Enquanto um arquivo não existir, o site mostra a ilustração padrão no lugar.
Para trocar nomes ou formatos, edite os caminhos em `assets/js/config.js`.

## `quiz/` — padrão `stepX-N` (etapa X, foto N)
| Etapa | Arquivo |
|---|---|
| 1 – Idade | `step1-1.webp` (20-29) … `step1-6.webp` (70+) — fundo transparente |
| 2 – Frustração | `icons/step2-1.png` … `icons/step2-6.png` — na ordem das opções |
| 7 – Prova social | `step7-1.webp`, `step7-2.webp`, `step7-3.webp`, `step7-4.png` |
| 11 – Motivacional | `step11-1.webp` |
| 14 – Resumo | `step14-1.webp` |

## `oferta/`
| Seção | Arquivo | Dica |
|---|---|---|
| Galeria (topo) | `product-1.webp` … `product-4.webp` | quadradas, 1200×1200 — a 1ª é a principal |
| Pacotes | `bundle-1.webp`, `bundle-3.webp`, `bundle-5.webp` | quadradas, 200×200 (1, 3 e 5 bolsas) |
| Informação nutricional | `supplement-facts.png` | rótulo de "Supplement Facts" |
| Ingredientes | `ingredient-1.png` … `ingredient-6.png` | redondas/quadradas, 200×200, na ordem do `config.js` |
| Reseñas (opcional) | `review-1.jpg` … | use o campo `photo` em `oferta.reviews` |
| Especialista (opcional) | `expert.jpg` | só se configurar `oferta.expert` |

Logo opcional: `assets/images/logo.png` + `quiz.images.logo` no `config.js`.
Use só imagens próprias ou licenciadas, e fotos/depoimentos de clientes reais com autorização.
