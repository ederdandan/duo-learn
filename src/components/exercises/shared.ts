import type { AgeGroup, Exercise } from '../../types';

export interface ExerciseProps<E extends Exercise> {
  exercise: E;
  ageGroup: AgeGroup;
  ttsRate: number;
  /** true depois que a resposta foi verificada (trava a interação). */
  locked: boolean;
  /** O exercício informa como verificar a resposta atual (null = ainda não respondeu). */
  onReady: (check: (() => boolean) | null) => void;
}

/** Texto da resposta certa mostrado no painel de feedback. */
export function correctAnswer(e: Exercise) {
  switch (e.type) {
    case 'multiple-choice':
      return e.options.find((o) => o.correct)?.text ?? '';
    case 'fill-blank':
      return `${e.sentenceParts[0]} ${e.correctWord} ${e.sentenceParts[1]}`.replace(/\s+([,.?!])/g, '$1').trim();
    case 'word-bank':
      return e.sentence;
    case 'speaking':
      return e.targetPhrase;
    case 'listening':
      return e.phrase;
    case 'listen-choose':
      return e.options.find((o) => o.correct)?.text ?? '';
    case 'translate':
      return e.sentence;
    case 'match-pairs':
      return e.pairs.map(([en, pt]) => `${en} = ${pt}`).join(' · ');
  }
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
