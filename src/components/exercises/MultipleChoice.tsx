import { useEffect, useMemo, useState } from 'react';
import { Volume2 } from 'lucide-react';
import type { MultipleChoiceExercise } from '../../types';
import { speak } from '../../lib/speech';
import { shuffle, type ExerciseProps } from './shared';

export function MultipleChoice({ exercise, ageGroup, ttsRate, locked, onReady }: ExerciseProps<MultipleChoiceExercise>) {
  const options = useMemo(() => shuffle(exercise.options), [exercise]);
  const [picked, setPicked] = useState<number | null>(null);
  const kids = ageGroup === 'kids';

  useEffect(() => {
    if (exercise.speak) speak(exercise.speak, ttsRate);
  }, [exercise, ttsRate]);

  function pick(i: number) {
    if (locked) return;
    setPicked(i);
    speak(options[i].text, ttsRate);
    onReady(() => options[i].correct);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-extrabold">{exercise.prompt}</h2>
        {exercise.speak && (
          <button
            onClick={() => speak(exercise.speak!, ttsRate)}
            className="rounded-xl bg-sky-100 p-2 text-sky-600 hover:bg-sky-200"
            aria-label="Ouvir"
          >
            <Volume2 className="size-5" />
          </button>
        )}
      </div>
      <div className={`grid gap-3 ${kids ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-3'}`}>
        {options.map((o, i) => (
          <button
            key={o.text}
            onClick={() => pick(i)}
            disabled={locked}
            className={`flex items-center gap-3 rounded-2xl border-2 border-b-4 p-4 text-left font-bold transition sm:flex-col sm:text-center ${
              picked === i ? 'border-sky-400 bg-sky-50 text-sky-700' : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <span className={kids ? 'text-6xl' : 'text-4xl'}>{o.icon}</span>
            <span className="text-lg">{o.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
