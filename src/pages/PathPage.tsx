import { Check, Dumbbell, Lock, Star } from 'lucide-react';
import { curriculum, isLevelUnlocked } from '../data/curriculum';
import { useStore } from '../store/AppStore';
import type { Level } from '../types';

interface Props {
  onStart: (levelId: string, practice: boolean) => void;
}

// Deslocamento horizontal dos nós para formar um caminho em zigue-zague.
const OFFSETS = [0, 60, 90, 60, 0, -60, -90, -60];

export function PathPage({ onStart }: Props) {
  const { active } = useStore();
  if (!active) return null;
  const noHearts = active.hearts <= 0;
  let globalIdx = 0;

  return (
    <div className="space-y-10 pb-8">
      {noHearts && (
        <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-4 text-rose-700">
          <p className="font-extrabold">💔 Sem corações por enquanto</p>
          <p className="text-sm">
            Toque numa lição já concluída para <b>treinar</b> e recuperar 1 coração — ou espere a recarga.
          </p>
        </div>
      )}

      {curriculum.map((unit) => (
        <section key={unit.id}>
          <div className="mb-8 rounded-2xl border-b-4 border-brand-700 bg-brand-600 p-5 text-white">
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
                  unlocked={isLevelUnlocked(level.id, active.completedLevels)}
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

function LevelNode({
  level,
  offset,
  done,
  unlocked,
  noHearts,
  onStart,
}: {
  level: Level;
  offset: number;
  done: boolean;
  unlocked: boolean;
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
          Começar
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
        {current && (
          <Star className="absolute -bottom-2 size-5 text-amber-300" fill="currentColor" />
        )}
      </button>
      <span className={`mt-2 font-extrabold ${unlocked ? 'text-slate-700' : 'text-slate-400'}`}>{level.title}</span>
    </div>
  );
}
