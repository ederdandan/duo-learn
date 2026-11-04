import { useEffect, useState } from 'react';
import type { TranslateExercise } from '../../types';
import { typedMatches } from '../../lib/validation';
import type { ExerciseProps } from './shared';

/** Lê a frase em português e escreve em inglês. */
export function Translate({ exercise, locked, onReady }: ExerciseProps<TranslateExercise>) {
  const [text, setText] = useState('');

  useEffect(() => {
    const answers = [exercise.sentence, ...(exercise.accept ?? [])];
    onReady(text.trim() ? () => answers.some((a) => typedMatches(text, a)) : null);
  }, [text, exercise]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold">{exercise.prompt}</h2>
      <p className="rounded-2xl border-2 border-slate-200 bg-white p-4 text-2xl font-bold">🇧🇷 {exercise.portuguese}</p>
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
