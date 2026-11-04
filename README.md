# 🏡 Duo Learn · Inglês em Família

Mini plataforma gamificada para a família aprender inglês junta — crianças, adultos e 60+ —
rodando 100% no navegador (sem backend, sem APIs pagas) e hospedada no GitHub Pages.

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/ (o que vai para o GitHub Pages)
```

> O reconhecimento de voz funciona melhor no **Chrome/Edge** e exige `localhost` ou HTTPS.
> Em navegadores sem suporte (ex.: Firefox), os exercícios de fala viram digitação automaticamente.

## Publicando no GitHub Pages

1. No GitHub: **Settings → Pages → Source: GitHub Actions**.
2. Faça push na `main`. O workflow `.github/workflows/deploy.yml` builda e publica.
3. O site fica em `https://<usuario>.github.io/duo-learn/`.

## Estrutura

```
src/
├── types/index.ts          # Modelos: UserProfile, Level, Exercise (5 tipos)
├── data/curriculum.ts      # CONTEÚDO: unidades → lições → exercícios (edite aqui)
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
| Corações | 5 no máximo, −1 por erro, recarrega 1 a cada 30 min |
| Erro | o exercício volta no fim da lição |
| Liga semanal | ranking por `weeklyXp`, zera toda segunda 00:00 |
| Bloqueio de sequência | 50 XP, máximo 2 — protege um dia sem estudar |

### Por faixa etária

| | Crianças | Adultos | 60+ |
|---|---|---|---|
| Fonte base | 17px | 16px | 20px |
| Velocidade da voz | 0.9× | 1× | 0.75× |
| Múltipla escolha | grade com emojis grandes | lista | lista |

## Como adicionar uma lição

Edite `src/data/curriculum.ts` e adicione um objeto `Level` dentro de uma unidade:

```ts
{
  id: 'lvl_6',            // único
  title: 'Animais',
  description: 'Bichos de casa e da fazenda',
  icon: '🐶',
  color: 'bg-teal-500',
  borderColor: 'border-teal-700',
  exercises: [
    { id: 'l6e1', type: 'multiple-choice', prompt: 'Qual é o "cachorro"?', speak: 'Dog',
      options: [{ text: 'Dog', icon: '🐶', correct: true }, { text: 'Cat', icon: '🐱', correct: false }] },
    { id: 'l6e2', type: 'listening', prompt: 'Ouça e escreva', phrase: 'I have a dog' },
  ],
}
```

Tipos disponíveis: `multiple-choice`, `fill-blank`, `word-bank`, `speaking`, `listening`.

## Próximos passos (backlog)

- [x] Reset semanal automático do XP
- [x] Bloqueio de sequência comprável com XP
- [x] Modo de escuta (ouvir e transcrever)
- [ ] Criador de lições pela interface (para pais/avós criarem listas próprias)
- [ ] PWA / offline (manifest + service worker)
- [ ] Repetição espaçada: revisar itens errados nos dias seguintes
- [ ] Conteúdo diferente por faixa etária (hoje a trilha é compartilhada)
