# 🏡 Duo Learn · Inglês em Família

Mini plataforma gamificada para a família aprender inglês junta — crianças, adultos e 60+ —
rodando 100% no navegador (sem backend, sem APIs pagas) e hospedada no GitHub Pages.

> 📘 **Para continuar o desenvolvimento (pessoas ou IAs):** leia [`docs/SPEC.md`](docs/SPEC.md) — arquitetura, modelos de dados, regras do jogo, armadilhas conhecidas e backlog.


## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/ (o que vai para o GitHub Pages)
```

> O reconhecimento de voz funciona melhor no **Chrome/Edge** e exige `localhost` ou HTTPS.
> Em navegadores sem suporte (ex.: Firefox), os exercícios de fala viram digitação automaticamente.

## App instalável (PWA)

- **Android / Chrome / Edge:** botão **"Instalar app"** na tela de Perfil (ou menu ⋮ → "Instalar app").
- **iPhone / iPad:** no Safari, **Compartilhar → "Adicionar à Tela de Início"** (instruções aparecem no Perfil).
- Funciona **sem internet** depois do primeiro acesso: `public/sw.js` guarda a página e os arquivos do app.
  Com internet, sempre carrega a versão mais nova.
- O reconhecimento de voz do Chrome precisa de internet; offline, o exercício de fala usa a digitação.
- Ícones gerados por `python scripts/make-icons.py` (sem dependências).

## Publicando no GitHub Pages

1. No GitHub: **Settings → Pages → Source: GitHub Actions**.
2. Faça push na `main`. O workflow `.github/workflows/deploy.yml` builda e publica.
3. O site fica em `https://<usuario>.github.io/duo-learn/`.

## Estrutura

```
src/
├── types/index.ts          # Modelos: UserProfile, Level, Exercise (5 tipos)
├── data/
│   ├── curriculum.ts       # Junta as trilhas e as regras de desbloqueio
│   ├── builders.ts         # Atalhos para escrever exercícios (mc, hear, fill, bank, write, pairs, say, listen)
│   └── tracks/             # CONTEÚDO: kids.ts, adults.ts, seniors.ts (120 perguntas cada)
├── lib/
│   ├── rules.ts            # Regras do jogo: XP, corações, streak, conquistas, ligas
│   ├── dates.ts            # Dia/semana (reset da liga na segunda-feira)
│   ├── speech.ts           # Web Speech API: falar (TTS) e ouvir (microfone)
│   ├── sounds.ts           # Efeitos sonoros com Web Audio (sem MP3)
│   ├── validation.ts       # Comparação tolerante de respostas (voz e digitação)
│   └── useNow.ts           # Hook de relógio para contadores
├── store/
│   ├── AppStore.tsx        # Estado global (React Context) + persistência
│   └── storage.ts          # localStorage, backup JSON, merge entre aparelhos
├── components/
│   ├── exercises/          # Um componente por tipo de exercício
│   ├── Button.tsx, StatsBar.tsx, BackupControls.tsx
└── pages/
    ├── ProfilesPage.tsx    # "Quem vai estudar?" + criar perfil
    ├── PathPage.tsx        # Trilha de lições (desbloqueio sequencial)
    ├── LessonPage.tsx      # Motor da lição: verificar → feedback → próxima
    ├── LeaderboardPage.tsx # Liga semanal da família (Bronze/Prata/Ouro)
    └── ProfilePage.tsx     # Estatísticas, conquistas, loja, backup
```

## Regras do jogo

| Regra | Valor |
|---|---|
| Lição concluída | +20 XP (+5 se não errar nada) |
| Treino (lição já feita) | +5 XP e recupera 1 ❤️, não perde corações |
| Erros permitidos (corações) | 3, 5, 10 ou 20, escolhido ao criar o perfil e alterável no Perfil. −1 por erro, recarrega 1 a cada 30 min |
| Erro | o exercício volta no fim da lição |
| Sair no meio da lição | o progresso é salvo a cada resposta; na trilha aparece "Continuar" |
| 5 dias sem estudar | a **etapa atual** recomeça; etapas anteriores, XP, conquistas e histórico ficam |
| Histórico | cada lição, treino e reinício fica registrado no Perfil, com acertos e erros |
| Meta diária | 10, 20, 30 ou 50 XP por dia (no Perfil). Barra na trilha, contador 🎯 no topo, comemoração ao bater |
| Revisão de erros | todo exercício errado entra na revisão. Acertou → volta em 1, 3, 7 e 14 dias; depois de 5 acertos seguidos está fixado. Errou → volta amanhã. Não gasta corações, recupera 1 e dá 10 XP |
| Missões diárias | 3 por dia, sorteadas por perfil (ex.: "acerte 5 seguidas", "complete 2 lições", "acerte 2 de fala"). Cada missão concluída libera um baú 🎁 com prêmio surpresa: +10/15/20 XP, corações cheios ou bloqueio de sequência |
| Foto do perfil | opcional (câmera ou galeria); é reduzida para 160×160 (~5 KB) e aparece no topo, na lista de perfis e no ranking |
| Liga semanal | ranking por `weeklyXp`, zera toda segunda 00:00 |
| Bloqueio de sequência | 50 XP, máximo 2 — protege um dia sem estudar |

### Por faixa etária

| | Crianças | Adultos | 60+ |
|---|---|---|---|
| Fonte base | 17px | 16px | 20px |
| Velocidade da voz | 0.9× | 1× | 0.75× |
| Múltipla escolha | grade com emojis grandes | lista | lista |

## Trilhas por faixa etária

Cada faixa etária tem a sua trilha: **5 etapas × 4 lições × 6 exercícios = 120 perguntas**, sem repetição.

| Trilha | Etapas |
|---|---|
| 🧒 Crianças | Meu mundo · Bichos · Minha casa · Comidinhas · Vamos brincar |
| 🧑 Adultos | O básico · Comer fora · Viagem · Trabalho · Vida social |
| 🧓 60+ | Primeiros passos · Saúde · Casa e rotina · Passeios · Conversar |

## Como adicionar uma lição

Edite o arquivo da trilha em `src/data/tracks/` e adicione uma lição dentro de uma etapa:

```ts
['Animais', 'Bichos de casa', '🐶', [
  mc('Qual é o "cachorro"?', 'Dog', ['Dog', '🐶'], ['Cat', '🐱'], ['Fish', '🐟']), // 1ª opção = correta
  fill('The', 'dog', 'is happy.', ['cat', 'sun']),
  bank('Eu tenho um cachorro', 'I have a dog', ['cat', 'is']),
  say('Good dog', 'Bom cachorro'),
  listen('My dog is big'),
  pairs(['Dog', 'Cachorro'], ['Cat', 'Gato'], ['Bird', 'Pássaro'], ['Fish', 'Peixe']),
]],
```

### Tipos de exercício

| Atalho | Tipo | O que a pessoa faz |
|---|---|---|
| `mc` | Múltipla escolha | Lê a pergunta em português e toca na opção certa |
| `hear` | Ouvir e escolher | Ouve a palavra (sem pergunta escrita) e toca na opção |
| `fill` | Completar | Escolhe a palavra que falta na frase |
| `bank` | Montar a frase | Toca nas palavras na ordem certa |
| `write` | Traduzir digitando | Lê em português e digita em inglês (`accept` = outras respostas válidas) |
| `pairs` | Ligar pares | Liga cada palavra em inglês à tradução (até 2 erros ainda conta como acerto) |
| `say` | Falar | Fala a frase no microfone (ou digita) |
| `listen` | Ouvir e escrever | Ouve a frase e digita o que ouviu |

Depois rode `npm run check:content`: ele confere se não há perguntas repetidas e se as opções estão coerentes
(o `npm run build` também roda essa checagem).

## Próximos passos (backlog)

- [x] Reset semanal automático do XP
- [x] Bloqueio de sequência comprável com XP
- [x] Modo de escuta (ouvir e transcrever)
- [ ] Criador de lições pela interface (para pais/avós criarem listas próprias)
- [x] PWA instalável + offline (manifest + service worker)
- [x] Missões diárias com baú
- [x] Revisão de erros com repetição espaçada
- [x] Meta diária
- [x] Trilha própria para cada faixa etária (120 perguntas cada)
- [x] Novos exercícios: ligar pares, ouvir e escolher, traduzir digitando
- [x] Erros permitidos configuráveis por perfil
- [x] Continuar lição de onde parou + histórico
