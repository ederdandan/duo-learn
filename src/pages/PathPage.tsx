import { Check, Dumbbell, Lock, Play, Star, X } from 'lucide-react';
import { findLevel, isLevelUnlocked, trackLevels, tracks } from '../data/curriculum';
import { useStore } from '../store/AppStore';
import { AGE_GROUPS, INACTIVITY_DAYS } from '../lib/rules';
import type { AgeGroup, Level } from '../types';

interface Props {
  onStart: (levelId: string, practice: boolean) => void;
}

// Deslocamento horizontal dos nós para formar um caminho em zigue-zague.
const OFFSETS = [0, 60, 90, 60, 0, -60, -90, -60];

export function PathPage({ onStart }: Props) {
  const { active, updateActive } = useStore();
  if (!active) return null;
  const g = active.ageGroup;
  const noHearts = active.hearts <= 0;
  const levels = trackLevels(g);
  const doneCount = levels.filter((l) => active.completedLevels.includes(l.id)).length;
  const questions = levels.reduce((n, l) => n + l.exercises.length, 0);
  const inProgress =
    active.lessonInProgress && levels.some((l) => l.id === active.lessonInProgress!.levelId)
      ? active.lessonInProgress
      : null;
  let globalIdx = 0;

  return (
    <div className="space-y-8 pb-8">
      {active.notice && (
        <div className="relative rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 pr-10 text-amber-800">
          <p className="font-extrabold">⏰ Etapa reiniciada</p>
          <p className="text-sm">{active.notice}</p>
          <button
            onClick={() => updateActive((p) => ({ ...p, notice: null }))}
            className="absolute right-3 top-3 text-amber-500 hover:text-amber-700"
            aria-label="Fechar aviso"
          >
            <X className="size-5" />
          </button>
        </div>
      )}

      {inProgress && !(noHearts && !inProgress.practice) && (
        <button
          onClick={() => onStart(inProgress.levelId, inProgress.practice)}
          className="flex w-full items-center gap-3 rounded-2xl border-2 border-b-4 border-emerald-500 bg-emerald-50 p-4 text-left hover:bg-emerald-100"
        >
          <Play className="size-8 shrink-0 text-emerald-600" fill="currentColor" />
          <span>
            <span className="block font-extrabold text-emerald-700">
              Continuar “{findLevel(inProgress.levelId)?.title}”
            </span>
            <span className="text-sm text-emerald-700/80">
              Você já acertou {inProgress.solved} de {findLevel(inProgress.levelId)?.exercises.length}. Seu progresso
              está salvo.
            </span>
          </span>
        </button>
      )}

      {noHearts && (
        <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-4 text-rose-700">
          <p className="font-extrabold">💔 Sem corações por enquanto</p>
          <p className="text-sm">
            Toque numa lição já concluída para <b>treinar</b> e recuperar 1 coração — ou espere a recarga.
          </p>
        </div>
      )}

      <TrackHeader g={g} done={doneCount} total={levels.length} questions={questions} />

      {tracks[g].map((unit) => (
        <section key={unit.id}>
          <div className={`mb-8 rounded-2xl border-b-4 p-5 text-white ${unit.levels[0].color} ${unit.levels[0].borderColor}`}>
            <h2 className="text-xl font-extrabold">{unit.title}</h2>
            <p className="opacity-90">{unit.description}</p>
          </div>
          <div className="flex flex-col items-center gap-6">
            {unit.levels.map((level) => {
              const offset = OFFSETS[globalIdx++ % OFFSETS.length];
              return (
                <LevelNode
                  key={level.id}
                  level={level}
                  offset={offset}
                  done={active.completedLevels.includes(level.id)}
                  unlocked={isLevelUnlocked(g, level.id, active.completedLevels)}
                  started={inProgress?.levelId === level.id}
                  noHearts={noHearts}
                  onStart={onStart}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function TrackHeader({ g, done, total, questions }: { g: AgeGroup; done: number; total: number; questions: number }) {
  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-extrabold">
          {AGE_GROUPS[g].emoji} Trilha {AGE_GROUPS[g].label}
        </p>
        <p className="text-sm font-bold text-slate-400">
          {done}/{total} lições · {questions} perguntas
        </p>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${(done / total) * 100}%` }} />
      </div>
      <p className="mt-2 text-xs text-slate-400">
        Fique {INACTIVITY_DAYS} dias sem estudar e a etapa atual recomeça (as anteriores ficam salvas).
      </p>
    </div>
  );
}

function LevelNode({
  level,
  offset,
  done,
  unlocked,
  started,
  noHearts,
  onStart,
}: {
  level: Level;
  offset: number;
  done: boolean;
  unlocked: boolean;
  started: boolean;
  noHearts: boolean;
  onStart: Props['onStart'];
}) {
  const current = unlocked && !done;
  // Sem corações: lições concluídas viram treino; novas ficam bloqueadas.
  const practice = done && noHearts;
  const playable = unlocked && (!noHearts || done);

  return (
    <div className="flex flex-col items-center" style={{ transform: `translateX(${offset}px)` }}>
      {current && !noHearts && (
        <span className="mb-2 animate-bounce rounded-xl border-2 border-slate-200 bg-white px-3 py-1 text-sm font-extrabold uppercase text-brand-600">
          {started ? 'Continuar' : 'Começar'}
        </span>
      )}
      <button
        onClick={() => playable && onStart(level.id, practice)}
        disabled={!playable}
        title={level.description}
        className={`relative flex size-20 items-center justify-center rounded-full border-b-8 text-3xl transition active:translate-y-1 active:border-b-4 ${
          unlocked ? `${level.color} ${level.borderColor} text-white` : 'border-slate-300 bg-slate-200 text-slate-400'
        } ${current ? 'ring-4 ring-brand-500/30 ring-offset-4' : ''} ${!playable ? 'cursor-not-allowed' : ''}`}
      >
        {!unlocked ? <Lock className="size-8" /> : <span>{level.icon}</span>}
        {done && (
          <span className="absolute -right-1 -top-1 rounded-full bg-amber-400 p-1 text-white">
            {practice ? <Dumbbell className="size-4" /> : <Check className="size-4" strokeWidth={4} />}
          </span>
        )}
        {current && <Star className="absolute -bottom-2 size-5 text-amber-300" fill="currentColor" />}
      </button>
      <span className={`mt-2 font-extrabold ${unlocked ? 'text-slate-700' : 'text-slate-400'}`}>{level.title}</span>
    </div>
  );
}
