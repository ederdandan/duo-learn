# 📘 ESPECIFICAÇÃO E CONTEXTO DO PROJETO — Duo Learn (Inglês em Família)

> **Versão do documento:** 2.0.0 (atualizado em 04/11/2026)
> **Status:** Em produção (MVP completo, evoluindo)
> **Repositório:** https://github.com/ederdandan/duo-learn (branch `main`)
> **Site no ar:** https://ederdandan.github.io/duo-learn/
> **Hospedagem:** GitHub Pages, 100% no navegador (sem backend, sem APIs pagas)

Este documento é o ponto de partida para qualquer pessoa ou IA que for continuar o projeto.
Ele descreve **o que existe hoje**, **como o código está organizado**, **as regras do jogo**,
**as armadilhas conhecidas** e **o que falta fazer**. O `README.md` do repositório complementa
com instruções de uso.

---

## 1. 📌 VISÃO GERAL

O **Duo Learn** é uma mini plataforma gamificada (SPA) para famílias aprenderem inglês juntas:
crianças, adultos e pessoas 60+, cada uma com sua própria trilha, no mesmo aparelho.

> ⚠️ **Nome e marca:** a versão 1.0 desta SPEC chamava o app de "Duolingo Family English App".
> O projeto foi renomeado para **Duo Learn**, com identidade própria (cores, ícone de casinha com
> coração). **Não usar** nome, logotipo, mascote, cores ou textos do Duolingo. Inspirar-se nas
> *mecânicas* (trilha, corações, sequência, ligas) é ok; copiar a *marca* não.

### Objetivos (todos atendidos)
1. **Perfis da família** num aparelho só, com troca rápida e backup/importação em JSON.
2. **Trilha própria por faixa etária** (crianças, adultos, 60+), com 120 perguntas cada, sem repetição.
3. **Ranking semanal da família** (Liga Bronze/Prata/Ouro) que zera toda segunda-feira.
4. **Voz:** reconhecimento de fala e leitura em voz alta com a Web Speech API, com digitação como alternativa.
5. **Zero backend:** tudo salvo no `localStorage`, com backup JSON para levar a outro aparelho.
6. **App instalável (PWA)** que funciona offline.

---

## 2. 🏗️ ARQUITETURA TÉCNICA

### Stack
| Item | Escolha |
|---|---|
| UI | React 18.3 + TypeScript 5.6 (strict) |
| Build | Vite 6 (`base: './'` → caminhos relativos, funciona em `/duo-learn/`) |
| Estilo | Tailwind CSS 4 (`@tailwindcss/vite`), tema em `src/index.css` (`--color-brand-*`, fonte Nunito) |
| Ícones | `lucide-react` (versão 1.x) |
| Voz | `SpeechRecognition`/`webkitSpeechRecognition` + `speechSynthesis` (nativos) |
| Sons | Web Audio API (osciladores, sem MP3) |
| Persistência | `localStorage` (chave `duo-learn:v1`) + backup JSON |
| Offline | Service worker escrito à mão (`public/sw.js`) + `manifest.webmanifest` |
| Deploy | GitHub Actions (`.github/workflows/deploy.yml`): a cada push na `main`, roda `npm ci && npm run build` e publica `dist/` |

**Não há** roteador (a navegação é por estado em `App.tsx`), gerenciador de estado externo, backend,
ESLint/Prettier nem testes automatizados no repositório (ver seção 9).

### Comandos
```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # tsc + checagem do conteúdo + vite build → dist/
npm run preview        # serve dist/ (necessário para testar o service worker/offline)
npm run check:content  # valida as 3 trilhas (contagem, repetição, coerência)
python scripts/make-icons.py   # regenera os ícones PNG (sem dependências)
```

### Estrutura de pastas
```
src/
├── main.tsx                 # monta o React e chama setupPwa()
├── App.tsx                  # navegação: perfis → (trilha | ranking | perfil) ou lição; fonte por faixa etária
├── index.css                # Tailwind + tema + animações (pop, shake, slide-up)
├── types/index.ts           # TODOS os modelos de dados (ver seção 3)
├── data/
│   ├── builders.ts          # atalhos de conteúdo: mc, hear, fill, bank, write, pairs, say, listen, unit
│   ├── curriculum.ts        # junta as trilhas; findLevel/findExercise/isLevelUnlocked/currentUnit
│   └── tracks/kids.ts | adults.ts | seniors.ts   # CONTEÚDO (5 etapas × 4 lições × 6 exercícios)
├── lib/
│   ├── rules.ts             # regras puras: XP, corações, streak, inatividade, meta diária, revisão, conquistas
│   ├── quests.ts            # missões diárias + baús
│   ├── dates.ts             # todayKey, weekKey (semana ISO, começa na segunda), daysBetween
│   ├── validation.ts        # normalize (minúsculas, sem acento/pontuação, expande contrações), comparações
│   ├── speech.ts            # speak(), listenOnce(), canRecognize()
│   ├── sounds.ts            # efeitos sonoros de acerto, erro e conclusão
│   ├── image.ts             # foto → JPEG 160×160 (data URL ~5 KB)
│   ├── pwa.ts               # registra o SW (só em produção) e o convite de instalação
│   └── useNow.ts            # hook de relógio
├── store/
│   ├── AppStore.tsx         # Context: state, active, updateActive, addProfile…; refresh a cada 30 s
│   └── storage.ts           # load/save, parseState (preenche campos faltantes), backup, merge
├── components/
│   ├── exercises/           # 1 componente por tipo + shared.ts (props comuns, correctAnswer, shuffle)
│   ├── DailyPanel.tsx       # meta do dia + revisão de erros
│   ├── QuestsPanel.tsx      # missões do dia + baús
│   ├── Avatar, PhotoPicker, HeartsPicker, InstallCard, StatsBar, BackupControls, Button
└── pages/
    ├── ProfilesPage.tsx     # "Quem vai estudar?" + criar perfil
    ├── PathPage.tsx         # trilha (avisos, continuar lição, painéis, nós em zigue-zague)
    ├── LessonPage.tsx       # motor da lição: modos lição / treino / revisão
    ├── LeaderboardPage.tsx  # Liga da Família
    └── ProfilePage.tsx      # estatísticas, configurações, conquistas, histórico, backup, instalação
scripts/check-content.ts     # validador do conteúdo (roda no build)
scripts/make-icons.py        # gera public/icons/*.png
public/sw.js, public/manifest.webmanifest, public/icons/
```

### Fluxo de dados
- O estado global fica em `AppStore` (React Context + `useState`) e é salvo no `localStorage` a cada mudança.
- **Toda regra de jogo é uma função pura** em `lib/rules.ts` ou `lib/quests.ts`, no formato
  `(perfil) => novo perfil`. As telas só chamam `updateActive(fn)`.
- `refreshAll` (ao carregar, ao trocar de perfil e a cada 30 s) aplica `refreshProfile` e depois `ensureQuests`:
  reset semanal, recarga de corações, quebra de sequência, reinício por inatividade e missões do dia.
- `updateActive` e `addProfile` também chamam `ensureQuests`.

---

## 3. 📄 MODELOS DE DADOS (fonte da verdade: `src/types/index.ts`)

### `AppState` (salvo em `localStorage['duo-learn:v1']`)
```ts
{ version: 1; profiles: UserProfile[]; activeProfileId: string | null }
```

### `UserProfile` (campos principais)
| Campo | Descrição |
|---|---|
| `id, name, avatar, photo` | Identidade. `photo` é uma data URL JPEG (ou `null`) e substitui o emoji |
| `ageGroup` | `'kids' \| 'adults' \| 'seniors'`: define a trilha, o tamanho da fonte e a velocidade da voz |
| `xp, weeklyXp, weekId` | XP total e XP da semana. Quando `weekId` (ex.: `2026-W45`) muda, o `weeklyXp` zera |
| `streak, lastActiveDate, streakFreezes` | Sequência de dias, último dia estudado e bloqueios de sequência (máximo 2) |
| `hearts, maxHearts, heartsUpdatedAt` | Corações (= erros permitidos, configurável em 3/5/10/20) e relógio da recarga |
| `completedLevels` | Ids das lições concluídas (de todas as trilhas) |
| `badges` | Ids das conquistas (ver `BADGES` em `rules.ts`) |
| `lessonInProgress` | Fila, posição, erros e acertos da lição em andamento (para continuar de onde parou) |
| `history` | Últimas 300 entradas `{at, kind: lesson\|practice\|review\|reset, title, xp, mistakes?}` |
| `answers` | `{correct, wrong}` de todos os tempos |
| `inactivityResetFor, notice` | Controle do reinício por inatividade e aviso mostrado na trilha |
| `dailyGoal, dailyXp, dailyDate, goalDays` | Meta diária (10/20/30/50), XP do dia e quantos dias a meta foi batida |
| `reviews, mastered` | Revisão de erros: `{[exerciseId]: {box, due, misses}}` e quantos itens foram fixados |
| `quests, chestsOpened` | Missões do dia `{date, ids, progress, opened}` e total de baús abertos |

> **Regra ao adicionar um campo novo no perfil:** coloque o valor padrão em **três** lugares:
> no tipo (`types/index.ts`), em `newProfile()` (`rules.ts`) e em `parseState()` (`storage.ts`).
> O `parseState` completa perfis antigos e backups importados. Se faltar ali, perfis salvos antes
> da mudança quebram.

### Conteúdo: `Unit → Level → Exercise`
- A hierarquia é Unit (etapa) → Level (lição) → Exercise.
- **Ids são gerados pela posição** em `builders.ts`:
  - etapa: `k_u1`;
  - lição: `k_u1_l2`;
  - exercício: `k_u1_l2_e3`.
  - Os prefixos são `k` para crianças, `a` para adultos e `s` para 60+.
- **8 tipos de exercício:**

| Atalho | `type` | O que a pessoa faz | Como a resposta é corrigida |
|---|---|---|---|
| `mc` | multiple-choice | Lê a pergunta e toca na opção certa | Opção marcada como correta |
| `hear` | listen-choose | Ouve a palavra e toca na opção | Opção marcada como correta |
| `fill` | fill-blank | Escolhe a palavra que falta | Palavra exata |
| `bank` | word-bank | Monta a frase com as palavras | `normalize()` igual |
| `write` | translate | Lê em português e digita em inglês | `typedMatches` contra a frase e o `accept[]` |
| `pairs` | match-pairs | Liga inglês ↔ português | Certo se errar no máximo 2 toques |
| `say` | speaking | Fala no microfone (ou digita) | Voz: `speechMatches` (≥ 80% das palavras em ordem). Digitado: `typedMatches` |
| `listen` | listening | Ouve a frase e digita | `typedMatches` |

A correção tolerante (`validation.ts`) ignora maiúsculas, acentos e pontuação, expande contrações
(`I'm` → `i am`, `can't` → `can not`, etc.) e aceita 1 letra errada em palavras com 5 letras ou mais.

---

## 4. 🎮 REGRAS DO JOGO (constantes em `lib/rules.ts` e `lib/quests.ts`)

| Regra | Valor / comportamento |
|---|---|
| Lição concluída | +20 XP, +5 se não errar nada (bônus de perfeição) |
| Treino (refazer lição já concluída) | +5 XP, não gasta corações, recupera 1 ❤️ |
| Revisão de erros | +10 XP, não gasta corações, recupera 1 ❤️, até 10 itens por sessão |
| Erro numa lição | −1 ❤️; o exercício volta no fim da lição **e** entra na revisão (`markForReview`) |
| Corações | Máximo configurável (3/5/10/20, padrão 5); recarrega 1 a cada 30 min. Com 0 corações, só treino ou revisão |
| Desbloqueio | Sequencial dentro da trilha (lição N exige a lição N−1) |
| Continuar de onde parou | O progresso é salvo a cada resposta. A última resposta certa já conclui a lição, mesmo que a pessoa feche o app |
| Sequência (streak) | +1 por dia estudado. Bloqueios cobrem dias perdidos (custam 50 XP ou vêm de baú; máximo 2) |
| Inatividade | Com **5 dias inteiros** sem estudar (`INACTIVITY_DAYS`), a **etapa atual** recomeça: só as lições dela voltam a ficar pendentes. XP, conquistas, histórico e etapas anteriores ficam. Acontece uma vez por ausência e mostra um aviso |
| Meta diária | 10/20/30/50 XP (padrão 20). O XP do baú **não** conta para a meta |
| Revisão (Leitner) | Intervalos `[0, 1, 3, 7, 14]` dias. Acerto → próxima caixa. Depois de 5 acertos seguidos, o item conta como fixado. Erro → volta amanhã, caixa 0. Só a 1ª tentativa de cada item na sessão conta |
| Missões diárias | 3 por dia, de métricas diferentes, sorteadas com semente `perfil + data` (o dia inteiro mantém as mesmas). A missão de revisão só aparece se houver itens guardados |
| Baú | 1 por missão concluída. Prêmio sorteado: +10, +15 ou +20 XP; corações cheios (só se faltar); +1 bloqueio (só se tiver menos de 2) |
| Liga semanal | Ranking por `weeklyXp`, que zera na segunda 00:00 (horário local). Bronze 0–59, Prata 60–149, Ouro 150+ |
| Por faixa etária | Fonte base 17/16/20 px (crianças/adultos/60+), velocidade da voz 0.9/1/0.75×, múltipla escolha em grade com emojis grandes para crianças |

### Conquistas (`BADGES`)
- Primeira lição, Perfeito, Constância (3 dias) e Semana de fogo (7 dias).
- Centena (100 XP), Primeira etapa, 100 respostas, Meta batida e 7 metas.
- Revisor, Fixou 10, Primeiro baú e Mestre da trilha.

---

## 5. 📚 CONTEÚDO ATUAL

Cada trilha tem **5 etapas × 4 lições × 6 exercícios = 120 perguntas** únicas.

| Trilha | Etapas |
|---|---|
| 🧒 Crianças (`k`) | Meu mundo · Bichos · Minha casa · Comidinhas · Vamos brincar |
| 🧑 Adultos (`a`) | O básico · Comer fora · Viagem · Trabalho · Vida social |
| 🧓 60+ (`s`) | Primeiros passos · Saúde · Casa e rotina · Passeios · Conversar |

- **Crianças:** sem "traduzir digitando".
- **Adultos:** "traduzir digitando" nas etapas 3 a 5.
- **60+:** "traduzir digitando" na etapa 5.
- **Todas as lições** terminam com um exercício de "ligar pares".

`npm run check:content` (que também roda no build) confere:
- se cada trilha tem exatamente 120 perguntas e os ids são únicos;
- se nenhuma resposta se repete dentro da trilha (por tipo);
- se a múltipla escolha tem exatamente 1 opção correta e o "completar" tem a resposta entre as opções;
- se o banco de palavras contém todas as palavras da frase e os pares não repetem palavras.

---

## 6. ✅ HISTÓRICO DO QUE FOI FEITO (commits na `main`)

| Commit | Entrega |
|---|---|
| `46eef0d` | Estrutura inicial: perfis, trilha, 5 tipos de exercício, corações, sequência, liga, backup e deploy no Pages |
| `ff00c59` | Trilha por faixa etária (100 perguntas cada), continuar de onde parou, histórico, reinício por inatividade, erros configuráveis |
| `f32d276` | Foto no perfil (também no ranking), revisão de erros (repetição espaçada), meta diária, respostas sem acento aceitas |
| `1314417` | Novos exercícios (ligar pares, ouvir e escolher, traduzir digitando) e trilhas com 120 perguntas |
| `3dd5ce1` | Missões diárias com baú e PWA (manifest, ícones, service worker offline, botão instalar) |

### Decisões tomadas com o usuário (manter)
- Interface e conteúdo em **português do Brasil**; código em inglês.
- Cada faixa etária tem a **sua** trilha. O progresso de cada trilha fica salvo ao trocar de faixa.
- "Sair e voltar não zera nada": qualquer progresso precisa ser salvo na hora.
- A inatividade reinicia a **etapa**, nunca o jogo inteiro.
- Os erros permitidos são escolhidos ao criar o perfil e podem ser mudados no Perfil.
- A foto do perfil aparece no ranking.
- Commit e push só quando o usuário pedir. O usuário costuma pedir "Commit e push" depois de revisar.

---

## 7. ⚠️ ARMADILHAS CONHECIDAS (ler antes de mexer)

1. **Ids posicionais do conteúdo.** Inserir ou remover uma lição ou exercício **no meio** muda os ids
   dos seguintes. Isso bagunça `completedLevels`, `reviews` e `lessonInProgress` dos perfis já salvos.
   - **Sempre adicione no fim** da lição ou da etapa.
   - Ou implemente ids explícitos antes de reorganizar o conteúdo (ver backlog).
2. **Service worker.** Ao mudar a lógica de `public/sw.js`, troque `CACHE` (hoje `duo-learn-v2`).
   - Use `cache.match(..., { ignoreVary: true })`: sem isso o app ficou em branco offline (problema já corrigido).
   - O SW só é registrado em produção. Para testar: `npm run build && npm run preview`.
3. **Campos novos no perfil** precisam de padrão em `newProfile` **e** `parseState` (ver seção 3).
4. **O ranking é local.** Cada aparelho tem o seu. A importação de backup junta perfis por `id` e,
   em conflito, fica com a versão de **maior XP** inteira. Não mescla campo a campo, então
   histórico e revisões do outro aparelho podem se perder.
5. **Reconhecimento de voz:** funciona no Chrome e no Edge e precisa de internet. Firefox e alguns
   iPhones não têm, e aí o exercício vira digitação automaticamente. **Nunca foi testado com
   microfone real**; os testes usaram o modo digitação.
6. **A instalação do PWA não foi testada num celular real.** O navegador usado nos testes não oferece
   `beforeinstallprompt`, então mostra as instruções pelo menu ⋮.
7. **Combo:** ao continuar uma lição salva, o contador de acertos seguidos recomeça do zero.
8. O XP total some do topo em telas estreitas para caber o contador 🎯. Ele continua visível no Perfil.
9. Os testes de regras feitos até agora foram scripts temporários (fora do repo). **Não há suíte
   de testes versionada.**

---

## 8. 🧪 COMO VALIDAR MUDANÇAS
- `npm run build` precisa passar: TypeScript estrito + checagem do conteúdo + build.
- **Regras:** escreva testes das funções puras de `rules.ts` e `quests.ts`. Hoje não há Vitest, e adicioná-lo é recomendado.
- **No navegador** (`npm run dev`): criar perfil → fazer lição (errar 1 de propósito) → conferir
  revisão, missões, meta, histórico. Para estados especiais, editar `localStorage['duo-learn:v1']`
  (ex.: `hearts: 0`, `lastActiveDate` antigo para testar inatividade, `completedLevels` para destravar lições).
- **Offline:** `npm run build && npm run preview` → abrir uma vez → parar o servidor → recarregar.

---

## 9. 🚀 PRÓXIMOS PASSOS (BACKLOG PRIORIZADO)

### Prioridade alta
- [ ] **Modo Dupla** (passa o celular). Dois perfis jogam a mesma lição alternando perguntas, e os dois ganham XP. É a identidade do "Duo".
- [ ] **Testes automatizados.** Vitest para `rules.ts`, `quests.ts` e `validation.ts`, rodando no CI antes do deploy.
- [ ] **Ids estáveis de conteúdo.** Ids explícitos ou um mapa de migração, para poder reorganizar lições sem quebrar o progresso.
- [ ] **Instruções faladas em português.** Botão 🔊 que lê o enunciado (TTS `pt-BR`), para crianças que não leem e para 60+.

### Prioridade média
- [ ] **Missão da Família semanal**: meta cooperativa somando o XP de todos.
- [ ] **Ligas com promoção e rebaixamento** de verdade, no lugar das faixas fixas de XP.
- [ ] **Calendário da sequência** e marcos de 7, 30 e 100 dias.
- [ ] **Lista "Palavras que aprendi"**, com busca e áudio.
- [ ] **Teste de nivelamento** para pular etapas.
- [ ] **Criador de lições** pela interface (pais e avós criam listas próprias, salvas no `localStorage`).
- [ ] **Painel dos pais**: progresso e maiores dificuldades de cada criança.
- [ ] **Modo escuro e alto contraste.**
- [ ] **Mesclagem de backup campo a campo** (histórico, revisões e conquistas), no lugar de "maior XP vence".

### Ideias / longo prazo
- [ ] Mascote próprio da família que evolui com o XP (criação original).
- [ ] Álbum de figurinhas, certificado de etapa para imprimir, frase do dia.
- [ ] Histórias curtas com perguntas de compreensão (exige muito conteúdo).
- [ ] Sincronizar aparelhos via QR code (sem servidor) ou backend opcional (ex.: Supabase) para ranking
      entre aparelhos e notificações push. Isso **muda a premissa "zero backend"** e precisa de decisão do usuário.
- [ ] Mais conteúdo: novas etapas **no fim** de cada trilha (ver armadilha 1).

---

## 10. 🗂️ RESUMO DAS CONVERSAS ANTERIORES
1. **Conceito inicial:** uma conversa sobre jogo de tabuleiro virou um app web de inglês inspirado em mecânicas de apps de idiomas.
2. **Restrições:** sem backend, sem APIs pagas, GitHub Pages, `localStorage` + backup JSON.
3. **Família:** voz, faixas etárias, ranking semanal e perfis com avatar.
4. **Implementação** (sessão com Claude Code, 03–04/11/2026): MVP construído e publicado. Na sequência
   vieram trilhas separadas, progresso salvo, histórico, inatividade por etapa, erros configuráveis,
   foto, revisão de erros, meta diária, 3 novos exercícios, missões com baú e PWA. Tudo está documentado acima.
