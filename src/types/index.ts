// Modelos de dados da plataforma (baseados na SPEC, com alguns campos extras
// para reset semanal, recarga de corações e streak).

export type AgeGroup = 'kids' | 'adults' | 'seniors';

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  ageGroup: AgeGroup;
  xp: number;
  weeklyXp: number;
  /** Semana (ISO, ex.: "2026-W45") a que o weeklyXp pertence. Muda → zera o weeklyXp. */
  weekId: string;
  streak: number;
  /** Último dia (AAAA-MM-DD) em que completou uma lição. */
  lastActiveDate: string | null;
  /** Bloqueios de streak que protegem um dia perdido. */
  streakFreezes: number;
  hearts: number;
  /** Momento (ms) da última recarga de corações. */
  heartsUpdatedAt: number;
  completedLevels: string[];
  badges: string[];
  createdAt: number;
}

export type ExerciseType = 'speaking' | 'word-bank' | 'multiple-choice' | 'fill-blank' | 'listening';

interface BaseExercise {
  id: string;
  type: ExerciseType;
  prompt: string;
}

export interface SpeakingExercise extends BaseExercise {
  type: 'speaking';
  targetPhrase: string;
  portugueseHint: string;
}

export interface WordBankExercise extends BaseExercise {
  type: 'word-bank';
  sentence: string;
  words: string[];
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple-choice';
  /** Palavra/frase falada em inglês ao abrir o exercício (opcional). */
  speak?: string;
  options: Array<{ text: string; icon: string; correct: boolean }>;
}

export interface FillBlankExercise extends BaseExercise {
  type: 'fill-blank';
  sentenceParts: [string, string];
  correctWord: string;
  options: string[];
}

/** Item do backlog da SPEC: ouvir a frase e digitar o que ouviu. */
export interface ListeningExercise extends BaseExercise {
  type: 'listening';
  phrase: string;
}

export type Exercise =
  | SpeakingExercise
  | WordBankExercise
  | MultipleChoiceExercise
  | FillBlankExercise
  | ListeningExercise;

export interface Level {
  id: string;
  title: string;
  description: string;
  icon: string;
  /** Classes Tailwind de cor do nó na trilha. */
  color: string;
  borderColor: string;
  exercises: Exercise[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  levels: Level[];
}

export interface AppState {
  version: 1;
  profiles: UserProfile[];
  activeProfileId: string | null;
}
