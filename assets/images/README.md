# Imagens — onde colocar cada uma

Envie os arquivos com **exatamente** estes nomes. Enquanto um arquivo não existir, o site mostra a ilustração padrão no lugar.
Para trocar nomes ou formatos, edite os caminhos em `assets/js/config.js`.

## `quiz/`
| Etapa | Arquivo | Dica |
|---|---|---|
| 1 – Idade | `age-1.webp` (20-29) … `age-6.webp` (70+) | 600×600, **fundo transparente** (assim o cartão fica todo dourado ao selecionar) |
| 2 – Frustração | `icons/icon-1.png` … `icons/icon-6.png` | ícones de linha pretos, fundo transparente, 64×64 |
| 7 – Prova social | `proof-1.jpg` … `proof-4.jpg` | quadradas, 800×800 |
| 11 – Motivacional | `transformation.png` | 680px de largura |
| 14 – Resumo | `profile.png` | 360×400, fundo transparente |

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
