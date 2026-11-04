import type { Unit } from '../types';

// Conteúdo como DADOS: para criar novas lições basta editar este arquivo
// (no futuro, o "Criador de Lições" da SPEC pode gravar no mesmo formato).

export const curriculum: Unit[] = [
  {
    id: 'unit_1',
    title: 'Unidade 1 · Primeiros passos',
    description: 'Cumprimentos, família e cores',
    levels: [
      {
        id: 'lvl_1',
        title: 'Olá!',
        description: 'Cumprimentos básicos',
        icon: '👋',
        color: 'bg-violet-500',
        borderColor: 'border-violet-700',
        exercises: [
          {
            id: 'l1e1',
            type: 'multiple-choice',
            prompt: 'Como se diz "Olá"?',
            speak: 'Hello',
            options: [
              { text: 'Hello', icon: '👋', correct: true },
              { text: 'Goodbye', icon: '🚪', correct: false },
              { text: 'Thanks', icon: '🙏', correct: false },
            ],
          },
          {
            id: 'l1e2',
            type: 'fill-blank',
            prompt: 'Complete a frase',
            sentenceParts: ['Good', ', how are you?'],
            correctWord: 'morning',
            options: ['morning', 'water', 'blue'],
          },
          {
            id: 'l1e3',
            type: 'word-bank',
            prompt: 'Monte a frase: "Meu nome é Ana"',
            sentence: 'My name is Ana',
            words: ['is', 'Ana', 'My', 'name', 'are'],
          },
          {
            id: 'l1e4',
            type: 'speaking',
            prompt: 'Fale em voz alta',
            targetPhrase: 'Nice to meet you',
            portugueseHint: 'Prazer em conhecer você',
          },
        ],
      },
      {
        id: 'lvl_2',
        title: 'Família',
        description: 'Membros da família',
        icon: '👨‍👩‍👧',
        color: 'bg-sky-500',
        borderColor: 'border-sky-700',
        exercises: [
          {
            id: 'l2e1',
            type: 'multiple-choice',
            prompt: 'Qual é a "avó"?',
            speak: 'Grandmother',
            options: [
              { text: 'Grandmother', icon: '👵', correct: true },
              { text: 'Brother', icon: '👦', correct: false },
              { text: 'Father', icon: '👨', correct: false },
            ],
          },
          {
            id: 'l2e2',
            type: 'listening',
            prompt: 'Ouça e escreva o que ouviu',
            phrase: 'This is my family',
          },
          {
            id: 'l2e3',
            type: 'fill-blank',
            prompt: 'Complete a frase',
            sentenceParts: ['She is my', '.'],
            correctWord: 'sister',
            options: ['sister', 'brother', 'father'],
          },
          {
            id: 'l2e4',
            type: 'speaking',
            prompt: 'Fale em voz alta',
            targetPhrase: 'I love my family',
            portugueseHint: 'Eu amo minha família',
          },
        ],
      },
      {
        id: 'lvl_3',
        title: 'Cores',
        description: 'As cores do dia a dia',
        icon: '🎨',
        color: 'bg-amber-500',
        borderColor: 'border-amber-700',
        exercises: [
          {
            id: 'l3e1',
            type: 'multiple-choice',
            prompt: 'Qual é a cor "vermelho"?',
            speak: 'Red',
            options: [
              { text: 'Red', icon: '🔴', correct: true },
              { text: 'Green', icon: '🟢', correct: false },
              { text: 'Blue', icon: '🔵', correct: false },
            ],
          },
          {
            id: 'l3e2',
            type: 'word-bank',
            prompt: 'Monte a frase: "O céu é azul"',
            sentence: 'The sky is blue',
            words: ['blue', 'The', 'is', 'sky', 'red'],
          },
          {
            id: 'l3e3',
            type: 'fill-blank',
            prompt: 'Complete a frase',
            sentenceParts: ['The banana is', '.'],
            correctWord: 'yellow',
            options: ['yellow', 'purple', 'black'],
          },
          {
            id: 'l3e4',
            type: 'speaking',
            prompt: 'Fale em voz alta',
            targetPhrase: 'My favorite color is green',
            portugueseHint: 'Minha cor favorita é verde',
          },
        ],
      },
    ],
  },
  {
    id: 'unit_2',
    title: 'Unidade 2 · No dia a dia',
    description: 'Comida, viagem e conversas',
    levels: [
      {
        id: 'lvl_4',
        title: 'Na mesa',
        description: 'Comidas e bebidas',
        icon: '🍎',
        color: 'bg-rose-500',
        borderColor: 'border-rose-700',
        exercises: [
          {
            id: 'l4e1',
            type: 'multiple-choice',
            prompt: 'Qual é a "água"?',
            speak: 'Water',
            options: [
              { text: 'Water', icon: '💧', correct: true },
              { text: 'Bread', icon: '🍞', correct: false },
              { text: 'Milk', icon: '🥛', correct: false },
            ],
          },
          {
            id: 'l4e2',
            type: 'word-bank',
            prompt: 'Monte a frase: "Eu gostaria de um café"',
            sentence: 'I would like a coffee',
            words: ['like', 'I', 'coffee', 'a', 'would', 'tea'],
          },
          {
            id: 'l4e3',
            type: 'listening',
            prompt: 'Ouça e escreva o que ouviu',
            phrase: 'I am hungry',
          },
          {
            id: 'l4e4',
            type: 'speaking',
            prompt: 'Fale em voz alta',
            targetPhrase: 'The check please',
            portugueseHint: 'A conta, por favor',
          },
        ],
      },
      {
        id: 'lvl_5',
        title: 'Viagem',
        description: 'No aeroporto e no hotel',
        icon: '✈️',
        color: 'bg-emerald-500',
        borderColor: 'border-emerald-700',
        exercises: [
          {
            id: 'l5e1',
            type: 'multiple-choice',
            prompt: 'Qual é o "passaporte"?',
            speak: 'Passport',
            options: [
              { text: 'Passport', icon: '🛂', correct: true },
              { text: 'Ticket', icon: '🎫', correct: false },
              { text: 'Suitcase', icon: '🧳', correct: false },
            ],
          },
          {
            id: 'l5e2',
            type: 'fill-blank',
            prompt: 'Complete a frase',
            sentenceParts: ['Where is the', '?'],
            correctWord: 'airport',
            options: ['airport', 'happy', 'eat'],
          },
          {
            id: 'l5e3',
            type: 'word-bank',
            prompt: 'Monte a frase: "Eu tenho uma reserva"',
            sentence: 'I have a reservation',
            words: ['a', 'have', 'reservation', 'I', 'has'],
          },
          {
            id: 'l5e4',
            type: 'speaking',
            prompt: 'Fale em voz alta',
            targetPhrase: 'How much is it',
            portugueseHint: 'Quanto custa?',
          },
        ],
      },
    ],
  },
];

export const allLevels = curriculum.flatMap((u) => u.levels);

export function findLevel(id: string) {
  return allLevels.find((l) => l.id === id);
}

/** Desbloqueio sequencial: um nível abre quando o anterior foi concluído. */
export function isLevelUnlocked(levelId: string, completed: string[]) {
  const idx = allLevels.findIndex((l) => l.id === levelId);
  return idx === 0 || completed.includes(allLevels[idx - 1]?.id);
}
