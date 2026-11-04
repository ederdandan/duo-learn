// Valida o conteúdo das trilhas: `npm run check:content`
// - 120 perguntas por trilha, sem repetir
// - ids únicos, opções coerentes em cada tipo de exercício
import { tracks } from '../src/data/curriculum';
import type { Exercise } from '../src/types';
import { normalize } from '../src/lib/validation';

const errors: string[] = [];
const allIds = new Set<string>();

function answerKey(e: Exercise) {
  switch (e.type) {
    case 'multiple-choice':
      return e.options.find((o) => o.correct)?.text ?? '';
    case 'fill-blank':
      return `${e.sentenceParts[0]} ${e.correctWord} ${e.sentenceParts[1]}`;
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
      return e.pairs.map((p) => p.join('=')).join('|');
  }
}

for (const [group, units] of Object.entries(tracks)) {
  const seen = new Map<string, string>();
  let count = 0;
  for (const u of units) {
    for (const l of u.levels) {
      if (allIds.has(l.id)) errors.push(`${l.id}: id de lição repetido`);
      allIds.add(l.id);
      for (const e of l.exercises) {
        count++;
        if (allIds.has(e.id)) errors.push(`${e.id}: id repetido`);
        allIds.add(e.id);

        const key = `${e.type}:${normalize(answerKey(e))}`;
        if (seen.has(key)) errors.push(`${e.id}: repete ${seen.get(key)} (${key})`);
        seen.set(key, e.id);

        if (e.type === 'multiple-choice' || e.type === 'listen-choose') {
          const correct = e.options.filter((o) => o.correct).length;
          if (correct !== 1) errors.push(`${e.id}: precisa de exatamente 1 opção correta`);
          if (new Set(e.options.map((o) => o.text)).size !== e.options.length) errors.push(`${e.id}: opções repetidas`);
        }
        if (e.type === 'fill-blank') {
          if (!e.options.includes(e.correctWord)) errors.push(`${e.id}: resposta fora das opções`);
          if (new Set(e.options).size !== e.options.length) errors.push(`${e.id}: opções repetidas`);
        }
        if (e.type === 'match-pairs') {
          if (e.pairs.length < 3) errors.push(`${e.id}: poucos pares`);
          if (new Set(e.pairs.map((p) => normalize(p[0]))).size !== e.pairs.length) errors.push(`${e.id}: inglês repetido`);
          if (new Set(e.pairs.map((p) => normalize(p[1]))).size !== e.pairs.length) errors.push(`${e.id}: português repetido`);
        }
        if (e.type === 'word-bank') {
          const pool = [...e.words];
          for (const w of e.sentence.split(' ')) {
            const i = pool.indexOf(w);
            if (i < 0) errors.push(`${e.id}: falta a palavra "${w}" no banco`);
            else pool.splice(i, 1);
          }
        }
      }
    }
  }
  console.log(`${group}: ${count} perguntas, ${units.length} etapas`);
  if (count !== 120) errors.push(`${group}: tem ${count} perguntas (esperado 120)`);
}

if (errors.length) {
  console.error(`\n${errors.length} problema(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log('\nConteúdo OK ✔');
