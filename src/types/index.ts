// Modelos de dados da plataforma (baseados na SPEC, com alguns campos extras
// para reset semanal, recarga de corações e streak).

export type AgeGroup = 'kids' | 'adults' | 'seniors';

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  /** Foto do perfil (data URL JPEG pequena). Se existir, aparece no lugar do emoji. */
  photo: string | null;
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
  /** Erros permitidos (corações máximos), configurável no perfil. */
  maxHearts: number;
  /** Momento (ms) da última recarga de corações. */
  heartsUpdatedAt: number;
  completedLevels: string[];
  badges: string[];
  createdAt: number;
  /** Lição começada e não terminada: ao voltar, continua de onde parou. */
  lessonInProgress: LessonProgress | null;
  /** Histórico de lições, treinos e reinícios (mais recentes primeiro). */
  history: HistoryEntry[];
  /** Total de respostas certas e erradas de todos os tempos. */
  answers: { correct: number; wrong: number };
  /** lastActiveDate que já gerou um reinício por inatividade (evita repetir). */
  inactivityResetFor: string | null;
  /** Aviso a mostrar na trilha (ex.: etapa reiniciada). */
  notice: string | null;
  /** Meta diária de XP escolhida pela pessoa. */
  dailyGoal: number;
  /** XP ganho no dia `dailyDate`. */
  dailyXp: number;
  dailyDate: string | null;
  /** Quantos dias a meta diária foi batida. */
  goalDays: number;
  /** Exercícios errados aguardando revisão, por id do exercício. */
  reviews: Record<string, ReviewItem>;
  /** Itens que saíram da revisão por terem sido fixados. */
  mastered: number;
}

export interface ReviewItem {
  /** Caixa de Leitner (0 = errou agora). */
  box: number;
  /** Quando volta para revisão (ms). */
  due: number;
  /** Quantas vezes já errou. */
  misses: number;
}

export interface LessonProgress {
  levelId: string;
  practice: boolean;
  /** Ids dos exercícios na ordem da fila (erros voltam para o fim). */
  queue: string[];
  idx: number;
  mistakes: number;
  solved: number;
  updatedAt: number;
}

export interface HistoryEntry {
  at: number;
  kind: 'lesson' | 'practice' | 'review' | 'reset';
  title: string;
  xp: number;
  mistakes?: number;
}

export type ExerciseType =
  | 'speaking'
  | 'word-bank'
  | 'multiple-choice'
  | 'fill-blank'
  | 'listening'
  | 'match-pairs'
  | 'listen-choose'
  | 'translate';

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

/** Ligar os pares: palavras em inglês ↔ português. */
export interface MatchPairsExercise extends BaseExercise {
  type: 'match-pairs';
  pairs: Array<[en: string, pt: string]>;
}

/** Ouvir e escolher a imagem (sem texto nas opções). */
export interface ListenChooseExercise extends BaseExercise {
  type: 'listen-choose';
  speak: string;
  options: Array<{ text: string; icon: string; correct: boolean }>;
}

/** Traduzir digitando: frase em português → inglês. */
export interface TranslateExercise extends BaseExercise {
  type: 'translate';
  portuguese: string;
  sentence: string;
  /** Outras traduções aceitas. */
  accept?: string[];
}

export type Exercise =
  | SpeakingExercise
  | WordBankExercise
  | MultipleChoiceExercise
  | FillBlankExercise
  | ListeningExercise
  | MatchPairsExercise
  | ListenChooseExercise
  | TranslateExercise;

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
