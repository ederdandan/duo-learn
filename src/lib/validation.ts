// Comparação tolerante de respostas (voz e digitação).

const CONTRACTIONS: Record<string, string> = {
  "i'm": 'i am',
  "it's": 'it is',
  "you're": 'you are',
  "she's": 'she is',
  "he's": 'he is',
  "what's": 'what is',
  "don't": 'do not',
  "doesn't": 'does not',
  "can't": 'can not',
  cannot: 'can not',
  "isn't": 'is not',
  "aren't": 'are not',
  "won't": 'will not',
  "let's": 'let us',
  "that's": 'that is',
  "we're": 'we are',
  "they're": 'they are',
  "i'll": 'i will',
  "you'll": 'you will',
  "i'd": 'i would',
  "i've": 'i have',
};

export function normalize(text: string) {
  let t = text.toLowerCase().replace(/[’`]/g, "'");
  for (const [k, v] of Object.entries(CONTRACTIONS)) t = t.replace(new RegExp(`\\b${k}\\b`, 'g'), v);
  return t
    .normalize('NFD')
    .replace(/\p{M}/gu, '') // tira acentos: "Sao Paulo" = "São Paulo"
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Distância de Levenshtein entre duas palavras (para perdoar erros de digitação). */
function editDistance(a: string, b: string) {
  const dp = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return dp[b.length];
}

/** Igual, ou 1 letra de diferença em palavras com 5+ letras. */
const typoMatch = (a: string, b: string) => a === b || (b.length >= 5 && editDistance(a, b) <= 1);

/** Para voz também aceita o mesmo prefixo ("reservations" ≈ "reservation"). */
const spokenMatch = (a: string, b: string) =>
  typoMatch(a, b) || (b.length >= 4 && a.startsWith(b) && a.length - b.length <= 2);

/**
 * Fala: aceita se a transcrição contém a frase-alvo, ou se ≥ 80% das palavras
 * da frase aparecem em ordem (o reconhecimento de voz erra palavras pequenas).
 */
export function speechMatches(transcripts: string[], target: string) {
  const goal = normalize(target).split(' ');
  return transcripts.some((raw) => {
    const said = normalize(raw);
    if (said.includes(goal.join(' '))) return true;
    const words = said.split(' ');
    let i = 0;
    let hits = 0;
    for (const g of goal) {
      const found = words.slice(i).findIndex((w) => spokenMatch(w, g));
      if (found >= 0) {
        hits++;
        i += found + 1;
      }
    }
    return hits / goal.length >= 0.8;
  });
}

/** Digitação: exige todas as palavras, mas perdoa pontuação, maiúsculas e 1 letra trocada. */
export function typedMatches(typed: string, target: string) {
  const a = normalize(typed).split(' ');
  const b = normalize(target).split(' ');
  return a.length === b.length && a.every((w, i) => typoMatch(w, b[i]));
}
