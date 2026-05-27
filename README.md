# Alex Coach — Landing Page

Landing page institucional do personal trainer **Gabriel Alex**, com apresentação dos planos, depoimentos de alunos, seção sobre o coach e formulário de contato. Integra-se à área do aluno (Coach System) para acesso a treinos, dietas e protocolos.

🔗 **Demo:** https://alex-coach.onrender.com/#home

## Funcionalidades

- Apresentação do coach e sua metodologia (seção "Sobre Mim")
- Vitrine de planos de acompanhamento
- Carrossel de depoimentos de alunos
- Galeria de resultados (transformações)
- Formulário de contato
- Botão direto para a área do aluno (login no [Coach System](https://github.com/ElielDelfino/coach-system))
- Layout 100% responsivo (desktop, tablet e mobile)
- Animações de scroll suaves
- Menu hambúrguer no mobile

## Stack

- **HTML5** — estrutura semântica
- **CSS3** — variáveis, flexbox, grid, animações e media queries
- **JavaScript (vanilla)** — navegação, carrossel, scroll suave e interações
- **Font Awesome** — ícones
- **Google Fonts** — tipografia (Oswald + Raleway)

## Estrutura

```
alex-coach/
├── index.html       # marcação da landing page
├── style.css        # estilos globais e responsividade
├── script.js        # interações (menu, scroll, carrossel)
└── src/             # imagens de capa, sobre e depoimentos
    ├── JMD_0091.JPEG
    ├── JMD_4852.JPEG
    └── JMD_6149.JPEG
```

## Como rodar localmente

Não há build step — basta abrir o `index.html` no navegador ou servir com um servidor estático qualquer:

```bash
# Opção 1 — abrir direto
xdg-open index.html

# Opção 2 — servidor leve via Python
python3 -m http.server 8080
# acesse http://localhost:8080

# Opção 3 — via npx
npx serve .
```

## Deploy

Hospedado no [Render](https://render.com) como Static Site. Qualquer push para a branch `main` dispara o redeploy automaticamente.

## Projeto relacionado

- [coach-system](https://github.com/ElielDelfino/coach-system) — plataforma completa onde os alunos do Gabriel acessam treinos, dietas e protocolos após login pela área do aluno desta landing.
