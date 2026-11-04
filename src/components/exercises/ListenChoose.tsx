import { useEffect, useMemo, useState } from 'react';
import { Snail, Volume2 } from 'lucide-react';
import type { ListenChooseExercise } from '../../types';
import { speak } from '../../lib/speech';
import { shuffle, type ExerciseProps } from './shared';

/** Ouve a palavra (sem ver a pergunta escrita) e escolhe a opção certa. */
export function ListenChoose({ exercise, ttsRate, locked, onReady }: ExerciseProps<ListenChooseExercise>) {
  const options = useMemo(() => shuffle(exercise.options), [exercise]);
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => {
    speak(exercise.speak, ttsRate);
  }, [exercise, ttsRate]);

  function pick(i: number) {
    if (locked) return;
    setPicked(i);
    onReady(() => options[i].correct);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold">{exercise.prompt}</h2>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => speak(exercise.speak, ttsRate)}
          className="rounded-2xl border-b-4 border-sky-700 bg-sky-500 p-5 text-white hover:bg-sky-400"
          aria-label="Ouvir de novo"
        >
          <Volume2 className="size-10" />
        </button>
        <button
          onClick={() => speak(exercise.speak, ttsRate * 0.6)}
          className="rounded-2xl border-b-4 border-sky-700 bg-sky-500 p-5 text-white hover:bg-sky-400"
          aria-label="Ouvir devagar"
        >
          <Snail className="size-10" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {options.map((o, i) => (
          <button
            key={o.text}
            onClick={() => pick(i)}
            disabled={locked}
            aria-label={`Opção ${i + 1}`}
            className={`flex flex-col items-center gap-1 rounded-2xl border-2 border-b-4 p-4 transition ${
              locked && o.correct
                ? 'border-emerald-400 bg-emerald-50'
                : picked === i
                  ? 'border-sky-400 bg-sky-50'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <span className="text-6xl">{o.icon}</span>
            <span className="text-sm font-bold text-slate-600">{o.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
