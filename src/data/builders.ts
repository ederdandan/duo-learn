import type { Exercise, Level, Unit } from '../types';

// Atalhos para escrever o conteúdo de forma compacta.
// Os ids são gerados automaticamente: <id da lição>_e1, _e2…

type Draft = Exercise extends infer E ? (E extends Exercise ? Omit<E, 'id'> : never) : never;

/** Múltipla escolha: a primeira opção é a correta (a ordem é embaralhada na tela). */
export const mc = (prompt: string, speak: string, correct: [string, string], ...wrong: [string, string][]): Draft => ({
  type: 'multiple-choice',
  prompt,
  speak,
  options: [
    { text: correct[0], icon: correct[1], correct: true },
    ...wrong.map(([text, icon]) => ({ text, icon, correct: false })),
  ],
});

/** Completar a lacuna: antes ___ depois. */
export const fill = (before: string, answer: string, after: string, wrong: string[]): Draft => ({
  type: 'fill-blank',
  prompt: 'Complete a frase',
  sentenceParts: [before, after],
  correctWord: answer,
  options: [answer, ...wrong],
});

/** Montar a frase em inglês a partir da tradução. */
export const bank = (pt: string, en: string, distractors: string[]): Draft => ({
  type: 'word-bank',
  prompt: `Monte a frase: "${pt}"`,
  sentence: en,
  words: [...en.split(' '), ...distractors],
});

/** Falar em voz alta. */
export const say = (en: string, pt: string): Draft => ({
  type: 'speaking',
  prompt: 'Fale em voz alta',
  targetPhrase: en,
  portugueseHint: pt,
});

/** Ouvir e escrever. */
export const listen = (en: string): Draft => ({
  type: 'listening',
  prompt: 'Ouça e escreva o que ouviu',
  phrase: en,
});

/** Ligar os pares: [inglês, português]. */
export const pairs = (...items: Array<[string, string]>): Draft => ({
  type: 'match-pairs',
  prompt: 'Toque nos pares',
  pairs: items,
});

/** Ouvir e escolher a imagem: a primeira opção é a correta. */
export const hear = (speak: string, correct: [string, string], ...wrong: [string, string][]): Draft => ({
  type: 'listen-choose',
  prompt: 'O que você ouviu?',
  speak,
  options: [
    { text: correct[0], icon: correct[1], correct: true },
    ...wrong.map(([text, icon]) => ({ text, icon, correct: false })),
  ],
});

/** Traduzir digitando (português → inglês). `accept` = outras respostas aceitas. */
export const write = (pt: string, en: string, accept: string[] = []): Draft => ({
  type: 'translate',
  prompt: 'Escreva em inglês',
  portuguese: pt,
  sentence: en,
  ...(accept.length ? { accept } : {}),
});

const PALETTE: Array<[string, string]> = [
  ['bg-violet-500', 'border-violet-700'],
  ['bg-sky-500', 'border-sky-700'],
  ['bg-amber-500', 'border-amber-700'],
  ['bg-rose-500', 'border-rose-700'],
  ['bg-emerald-500', 'border-emerald-700'],
];

type LevelDraft = [title: string, description: string, icon: string, exercises: Draft[]];

/** Cria uma unidade (etapa). Cada unidade recebe uma cor da paleta. */
export function unit(prefix: string, n: number, title: string, description: string, levels: LevelDraft[]): Unit {
  const [color, borderColor] = PALETTE[(n - 1) % PALETTE.length];
  return {
    id: `${prefix}_u${n}`,
    title: `Etapa ${n} · ${title}`,
    description,
    levels: levels.map(([t, d, icon, exs], i): Level => {
      const id = `${prefix}_u${n}_l${i + 1}`;
      return {
        id,
        title: t,
        description: d,
        icon,
        color,
        borderColor,
        exercises: exs.map((e, j) => ({ ...e, id: `${id}_e${j + 1}` }) as Exercise),
      };
    }),
  };
}
