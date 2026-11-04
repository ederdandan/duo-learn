import { useEffect, useState } from 'react';
import { Snail, Volume2 } from 'lucide-react';
import type { ListeningExercise } from '../../types';
import { speak } from '../../lib/speech';
import { typedMatches } from '../../lib/validation';
import type { ExerciseProps } from './shared';

export function Listening({ exercise, ttsRate, locked, onReady }: ExerciseProps<ListeningExercise>) {
  const [text, setText] = useState('');

  useEffect(() => {
    speak(exercise.phrase, ttsRate);
  }, [exercise, ttsRate]);

  useEffect(() => {
    onReady(text.trim() ? () => typedMatches(text, exercise.phrase) : null);
  }, [text, exercise]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold">{exercise.prompt}</h2>
      <div className="flex gap-3">
        <button
          onClick={() => speak(exercise.phrase, ttsRate)}
          className="rounded-2xl border-b-4 border-sky-700 bg-sky-500 p-5 text-white hover:bg-sky-400"
          aria-label="Ouvir de novo"
        >
          <Volume2 className="size-8" />
        </button>
        <button
          onClick={() => speak(exercise.phrase, ttsRate * 0.6)}
          className="rounded-2xl border-b-4 border-sky-700 bg-sky-500 p-5 text-white hover:bg-sky-400"
          aria-label="Ouvir devagar"
        >
          <Snail className="size-8" />
        </button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={locked}
        rows={3}
        placeholder="Escreva em inglês…"
        autoCapitalize="off"
        spellCheck={false}
        className="w-full rounded-2xl border-2 border-slate-200 bg-white p-4 text-lg outline-none focus:border-sky-400"
      />
    </div>
  );
}
