// Web Speech API: síntese (TTS) e reconhecimento de voz, sem serviços externos.

let cachedVoice: SpeechSynthesisVoice | null | undefined;

function englishVoice() {
  if (cachedVoice !== undefined && cachedVoice !== null) return cachedVoice;
  const voices = window.speechSynthesis?.getVoices() ?? [];
  cachedVoice =
    voices.find((v) => v.lang === 'en-US' && /natural|google|samantha/i.test(v.name)) ??
    voices.find((v) => v.lang === 'en-US') ??
    voices.find((v) => v.lang.startsWith('en')) ??
    null;
  return cachedVoice;
}

export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

export function speak(text: string, rate = 1) {
  if (!canSpeak()) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = rate;
  const v = englishVoice();
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
}

// Tipagem mínima: SpeechRecognition ainda não está no lib.dom padrão.
interface RecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}

function recognitionCtor(): (new () => RecognitionLike) | null {
  const w = window as unknown as Record<string, unknown>;
  return (w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null) as (new () => RecognitionLike) | null;
}

export const canRecognize = () => typeof window !== 'undefined' && recognitionCtor() !== null;

/**
 * Escuta o microfone uma vez. Resolve com as alternativas transcritas
 * (o navegador às vezes acerta na 2ª ou 3ª opção).
 */
export function listenOnce(): { promise: Promise<string[]>; stop: () => void } {
  const Ctor = recognitionCtor();
  if (!Ctor) return { promise: Promise.reject(new Error('unsupported')), stop: () => {} };
  const rec = new Ctor();
  rec.lang = 'en-US';
  rec.interimResults = false;
  rec.maxAlternatives = 3;
  const promise = new Promise<string[]>((resolve, reject) => {
    let done = false;
    rec.onresult = (e) => {
      done = true;
      const alts = Array.from(e.results[0] ?? []).map((a) => a.transcript);
      resolve(alts);
    };
    rec.onerror = (e) => {
      done = true;
      reject(new Error(e.error));
    };
    rec.onend = () => {
      if (!done) resolve([]);
    };
  });
  rec.start();
  return { promise, stop: () => rec.stop() };
}
