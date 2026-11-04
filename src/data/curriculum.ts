import type { AgeGroup, Level, Unit } from '../types';
import { kids } from './tracks/kids';
import { adults } from './tracks/adults';
import { seniors } from './tracks/seniors';

// Uma trilha separada para cada faixa etária (100 perguntas cada).
// Para criar lições, edite os arquivos em ./tracks.

export const tracks: Record<AgeGroup, Unit[]> = { kids, adults, seniors };

export const trackLevels = (g: AgeGroup): Level[] => tracks[g].flatMap((u) => u.levels);

const everyLevel = Object.values(tracks).flatMap((units) => units.flatMap((u) => u.levels));

export function findLevel(id: string) {
  return everyLevel.find((l) => l.id === id);
}

export function findExercise(id: string) {
  for (const l of everyLevel) {
    const e = l.exercises.find((x) => x.id === id);
    if (e) return e;
  }
  return undefined;
}

export function findUnitOfLevel(id: string) {
  return Object.values(tracks)
    .flat()
    .find((u) => u.levels.some((l) => l.id === id));
}

/** Desbloqueio sequencial dentro da trilha. */
export function isLevelUnlocked(g: AgeGroup, levelId: string, completed: string[]) {
  const levels = trackLevels(g);
  const idx = levels.findIndex((l) => l.id === levelId);
  return idx === 0 || (idx > 0 && completed.includes(levels[idx - 1].id));
}

/** Etapa atual: a que contém a primeira lição ainda não concluída. */
export function currentUnit(g: AgeGroup, completed: string[]) {
  return tracks[g].find((u) => u.levels.some((l) => !completed.includes(l.id))) ?? null;
}
