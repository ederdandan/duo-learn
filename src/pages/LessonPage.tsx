import { useCallback, useState, type ReactNode } from 'react';
import { CheckCircle2, Heart, Volume2, X, XCircle } from 'lucide-react';
import type { Exercise } from '../types';
import { findLevel } from '../data/curriculum';
import { useStore } from '../store/AppStore';
import { AGE_GROUPS, BADGES, completeLesson, loseHeart, recordAnswer, type LessonReward } from '../lib/rules';
import { sounds } from '../lib/sounds';
import { speak } from '../lib/speech';
import { Button } from '../components/Button';
import { correctAnswer } from '../components/exercises/shared';
import { MultipleChoice } from '../components/exercises/MultipleChoice';
import { FillBlank } from '../components/exercises/FillBlank';
import { WordBank } from '../components/exercises/WordBank';
import { Speaking } from '../components/exercises/Speaking';
import { Listening } from '../components/exercises/Listening';

interface Props {
  levelId: string;
  /** Treino: revisa lição já feita, não perde corações e recupera 1. */
  practice: boolean;
  onExit: () => void;
}

type Feedback = { correct: boolean; answer: string } | null;

export function LessonPage({ levelId, practice, onExit }: Props) {
  const { active, updateActive } = useStore();
  const level = findLevel(levelId);
  // Se a pessoa saiu no meio desta lição, continua exatamente de onde parou.
  const [saved] = useState(() => {
    const s = active?.lessonInProgress;
    return s && s.levelId === levelId && s.practice === practice ? s : null;
  });
  const [queue, setQueue] = useState<Exercise[]>(() => {
    const all = level?.exercises ?? [];
    if (!saved) return all;
    const restored = saved.queue.map((id) => all.find((e) => e.id === id)).filter((e): e is Exercise => !!e);
    return restored.length ? restored : all;
  });
  const [idx, setIdx] = useState(() => (saved && saved.idx < queue.length ? saved.idx : 0));
  const [mistakes, setMistakes] = useState(saved?.mistakes ?? 0);
  const [solved, setSolved] = useState(saved?.solved ?? 0);
  const [checker, setChecker] = useState<(() => boolean) | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [reward, setReward] = useState<LessonReward | null>(null);
  const [pendingReward, setPendingReward] = useState<LessonReward | null>(null);
  const [outOfHearts, setOutOfHearts] = useState(false);

  // setState com função precisa ser embrulhado para guardar a função em si.
  const onReady = useCallback((fn: (() => boolean) | null) => setChecker(() => fn), []);

  const total = level?.exercises.length ?? 1;

  if (!level || !active) return null;
  const ttsRate = AGE_GROUPS[active.ageGroup].ttsRate;
  const exercise = queue[idx];

  function check() {
    if (!checker || !exercise) return;
    const correct = checker();
    setFeedback({ correct, answer: correctAnswer(exercise) });

    // Exercício errado volta no fim da fila: só termina quando acertar tudo.
    const nextQueue = correct ? queue : [...queue, exercise];
    const nextMistakes = mistakes + (correct ? 0 : 1);
    const nextSolved = solved + (correct ? 1 : 0);
    setQueue(nextQueue);
    setMistakes(nextMistakes);
    setSolved(nextSolved);
    if (correct) sounds.correct();
    else sounds.wrong();

    // Última resposta certa: a lição já conta como concluída (mesmo se fechar agora).
    if (correct && idx + 1 >= nextQueue.length) {
      const out = completeLesson(recordAnswer(active!, true), { levelId, mistakes: nextMistakes, practice });
      updateActive(() => out.profile);
      setPendingReward(out.reward);
      return;
    }

    // Salva o progresso a cada resposta: sair e voltar não perde nada.
    updateActive((p) => {
      let n = recordAnswer(p, correct);
      if (!correct && !practice) n = loseHeart(n);
      return {
        ...n,
        lessonInProgress: {
          levelId,
          practice,
          queue: nextQueue.map((e) => e.id),
          idx: idx + 1,
          mistakes: nextMistakes,
          solved: nextSolved,
          updatedAt: Date.now(),
        },
      };
    });
    if (!correct && !practice && active!.hearts - 1 <= 0) setOutOfHearts(true);
  }

  function next() {
    setFeedback(null);
    setChecker(null);
    if (pendingReward) {
      setReward(pendingReward);
      sounds.complete();
      return;
    }
    if (outOfHearts) return;
    setIdx((i) => i + 1);
  }

  if (reward) return <LessonComplete reward={reward} mistakes={mistakes} practice={practice} onExit={onExit} />;

  if (outOfHearts && !feedback) {
    return (
      <Screen>
        <div className="text-7xl">💔</div>
        <h1 className="text-3xl font-extrabold">Acabaram os corações</h1>
        <p className="max-w-sm text-slate-500">
          Sem problemas! Eles voltam com o tempo (1 a cada 30 min), ou você pode <b>treinar uma lição já feita</b>{' '}
          para recuperar um coração agora.
        </p>
        <p className="max-w-sm font-bold text-emerald-600">Seu progresso nesta lição ficou salvo.</p>
        <Button onClick={onExit}>Voltar para a trilha</Button>
      </Screen>
    );
  }

  const props = { ageGroup: active.ageGroup, ttsRate, locked: !!feedback, onReady };

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-4">
      <header className="flex items-center gap-4 py-5">
        <button onClick={onExit} className="text-slate-400 hover:text-slate-600" aria-label="Sair da lição">
          <X className="size-7" />
        </button>
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${Math.min(100, (solved / total) * 100)}%` }}
          />
        </div>
        {practice ? (
          <span className="rounded-lg bg-sky-100 px-2 py-1 text-xs font-extrabold uppercase text-sky-600">Treino</span>
        ) : (
          <span className="flex items-center gap-1 font-extrabold text-rose-500">
            <Heart className="size-6" fill="currentColor" /> {active.hearts}
          </span>
        )}
      </header>

      <main key={`${idx}-${exercise.id}`} className="flex-1 py-6">
        {exercise.type === 'multiple-choice' && <MultipleChoice exercise={exercise} {...props} />}
        {exercise.type === 'fill-blank' && <FillBlank exercise={exercise} {...props} />}
        {exercise.type === 'word-bank' && <WordBank exercise={exercise} {...props} />}
        {exercise.type === 'speaking' && <Speaking exercise={exercise} {...props} />}
        {exercise.type === 'listening' && <Listening exercise={exercise} {...props} />}
      </main>

      <footer
        className={`-mx-4 border-t-2 px-4 py-5 ${
          feedback ? (feedback.correct ? 'animate-slide-up border-emerald-200 bg-emerald-100' : 'animate-slide-up border-rose-200 bg-rose-100') : 'border-slate-200'
        }`}
      >
        <div className="mx-auto flex max-w-2xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {feedback && (
            <div className={feedback.correct ? 'text-emerald-700' : 'text-rose-700'}>
              <p className="flex items-center gap-2 text-xl font-extrabold">
                {feedback.correct ? <CheckCircle2 className="size-7" /> : <XCircle className="size-7" />}
                {feedback.correct ? 'Muito bem!' : 'Resposta certa:'}
              </p>
              {!feedback.correct && (
                <p className="mt-1 flex items-center gap-2 font-bold">
                  {feedback.answer}
                  <button onClick={() => speak(feedback.answer, ttsRate)} aria-label="Ouvir resposta">
                    <Volume2 className="size-5" />
                  </button>
                </p>
              )}
              {!feedback.correct && <p className="text-sm">Essa volta no final da lição para você praticar.</p>}
            </div>
          )}
          {feedback ? (
            <Button variant={feedback.correct ? 'success' : 'danger'} onClick={next} className="sm:ml-auto sm:min-w-40">
              Continuar
            </Button>
          ) : (
            <Button variant="success" onClick={check} disabled={!checker} className="sm:ml-auto sm:min-w-40">
              Verificar
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}

function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-5 px-4 text-center">
      {children}
    </div>
  );
}

function LessonComplete({
  reward,
  mistakes,
  practice,
  onExit,
}: {
  reward: LessonReward;
  mistakes: number;
  practice: boolean;
  onExit: () => void;
}) {
  return (
    <Screen>
      <div className="animate-pop text-8xl">{mistakes === 0 ? '🏆' : '🎉'}</div>
      <h1 className="text-3xl font-extrabold text-amber-500">{practice ? 'Treino concluído!' : 'Lição concluída!'}</h1>
      <div className="grid w-full grid-cols-2 gap-3">
        <div className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-4">
          <p className="text-xs font-extrabold uppercase text-amber-600">XP ganho</p>
          <p className="text-3xl font-extrabold text-amber-500">+{reward.xp}</p>
        </div>
        <div className="rounded-2xl border-2 border-orange-400 bg-orange-50 p-4">
          <p className="text-xs font-extrabold uppercase text-orange-600">Sequência</p>
          <p className="text-3xl font-extrabold text-orange-500">🔥 {reward.streak}</p>
        </div>
      </div>
      {practice && <p className="font-bold text-rose-500">+1 ❤️ recuperado</p>}
      {mistakes === 0 && !practice && <p className="font-bold text-emerald-600">Sem erros! Bônus de perfeição 💎</p>}
      {reward.newBadges.length > 0 && (
        <div className="w-full rounded-2xl border-2 border-brand-500 bg-brand-50 p-4">
          <p className="mb-2 font-extrabold text-brand-700">Nova conquista!</p>
          {reward.newBadges.map((b) => (
            <p key={b} className="text-lg font-bold">
              {BADGES[b]?.icon} {BADGES[b]?.label}
            </p>
          ))}
        </div>
      )}
      <Button onClick={onExit} className="w-full">
        Continuar
      </Button>
    </Screen>
  );
}
