import type { AgeGroup, UserProfile } from '../types';
import { allLevels, curriculum } from '../data/curriculum';
import { daysBetween, todayKey, weekKey } from './dates';

// Regras do jogo em um único lugar, como funções puras (fáceis de testar).

export const MAX_HEARTS = 5;
export const HEART_REFILL_MS = 30 * 60 * 1000; // 1 coração a cada 30 min
export const XP_PER_LESSON = 20;
export const XP_PERFECT_BONUS = 5;
export const XP_PRACTICE = 5;
export const STREAK_FREEZE_COST = 50;
export const MAX_STREAK_FREEZES = 2;

export const AGE_GROUPS: Record<AgeGroup, { label: string; emoji: string; ttsRate: number; hint: string }> = {
  kids: { label: 'Crianças', emoji: '🧒', ttsRate: 0.9, hint: 'Mais imagens e frases curtas' },
  adults: { label: 'Adultos', emoji: '🧑', ttsRate: 1, hint: 'Situações práticas e ritmo rápido' },
  seniors: { label: '60+', emoji: '🧓', ttsRate: 0.75, hint: 'Letras maiores e fala mais lenta' },
};

export const BADGES: Record<string, { label: string; icon: string; description: string }> = {
  first_lesson: { label: 'Primeira lição', icon: '🎉', description: 'Completou a primeira lição' },
  perfect: { label: 'Perfeito', icon: '💎', description: 'Lição sem nenhum erro' },
  streak_3: { label: 'Constância', icon: '🔥', description: '3 dias seguidos' },
  streak_7: { label: 'Semana de fogo', icon: '🌟', description: '7 dias seguidos' },
  xp_100: { label: 'Centena', icon: '💯', description: '100 XP acumulados' },
  unit_1: { label: 'Unidade 1', icon: '🏅', description: 'Concluiu a Unidade 1' },
  all_levels: { label: 'Mestre da trilha', icon: '👑', description: 'Concluiu todas as lições' },
};

export function newProfile(name: string, avatar: string, ageGroup: AgeGroup): UserProfile {
  const now = Date.now();
  return {
    id: `usr_${now}_${Math.random().toString(36).slice(2, 6)}`,
    name: name.trim(),
    avatar,
    ageGroup,
    xp: 0,
    weeklyXp: 0,
    weekId: weekKey(),
    streak: 0,
    lastActiveDate: null,
    streakFreezes: 0,
    hearts: MAX_HEARTS,
    heartsUpdatedAt: now,
    completedLevels: [],
    badges: [],
    createdAt: now,
  };
}

/**
 * Aplica as regras que dependem do tempo: reset semanal do weeklyXp,
 * recarga de corações e quebra de streak. Chamado ao carregar e periodicamente.
 */
export function refreshProfile(p: UserProfile, now = Date.now()): UserProfile {
  let next = p;
  const wk = weekKey(new Date(now));
  if (p.weekId !== wk) next = { ...next, weeklyXp: 0, weekId: wk };

  if (next.hearts < MAX_HEARTS) {
    const gained = Math.floor((now - next.heartsUpdatedAt) / HEART_REFILL_MS);
    if (gained > 0) {
      const hearts = Math.min(MAX_HEARTS, next.hearts + gained);
      next = {
        ...next,
        hearts,
        heartsUpdatedAt: hearts === MAX_HEARTS ? now : next.heartsUpdatedAt + gained * HEART_REFILL_MS,
      };
    }
  }

  if (next.lastActiveDate && next.streak > 0) {
    const gap = daysBetween(next.lastActiveDate, todayKey(new Date(now)));
    // gap 1 = ainda pode jogar hoje; cada dia perdido consome um bloqueio.
    const missed = gap - 1;
    if (missed > next.streakFreezes) next = { ...next, streak: 0 };
  }
  return next;
}

/** Milissegundos até o próximo coração (ou null se cheio). */
export function msToNextHeart(p: UserProfile, now = Date.now()) {
  if (p.hearts >= MAX_HEARTS) return null;
  return Math.max(0, HEART_REFILL_MS - (now - p.heartsUpdatedAt));
}

export function loseHeart(p: UserProfile): UserProfile {
  if (p.hearts <= 0) return p;
  // Se estava cheio, o relógio da recarga começa agora.
  const heartsUpdatedAt = p.hearts === MAX_HEARTS ? Date.now() : p.heartsUpdatedAt;
  return { ...p, hearts: p.hearts - 1, heartsUpdatedAt };
}

export interface LessonResult {
  levelId: string;
  mistakes: number;
  practice: boolean;
}

export interface LessonReward {
  xp: number;
  newBadges: string[];
  streak: number;
  streakIncreased: boolean;
}

export function completeLesson(p: UserProfile, r: LessonResult): { profile: UserProfile; reward: LessonReward } {
  const today = todayKey();
  const xp = r.practice ? XP_PRACTICE : XP_PER_LESSON + (r.mistakes === 0 ? XP_PERFECT_BONUS : 0);

  // Streak
  let { streak, streakFreezes } = p;
  let streakIncreased = false;
  if (p.lastActiveDate !== today) {
    const gap = p.lastActiveDate ? daysBetween(p.lastActiveDate, today) : Infinity;
    const missed = gap - 1;
    if (streak > 0 && missed >= 0 && missed <= streakFreezes) {
      streakFreezes -= missed;
      streak += 1;
    } else {
      streak = 1;
    }
    streakIncreased = true;
  }

  const completedLevels =
    r.practice || p.completedLevels.includes(r.levelId) ? p.completedLevels : [...p.completedLevels, r.levelId];

  let next: UserProfile = {
    ...p,
    xp: p.xp + xp,
    weeklyXp: p.weeklyXp + xp,
    streak,
    streakFreezes,
    lastActiveDate: today,
    completedLevels,
    // Treino recupera 1 coração: errar não trava o estudo.
    hearts: r.practice ? Math.min(MAX_HEARTS, p.hearts + 1) : p.hearts,
  };

  const newBadges = earnedBadges(next, r).filter((b) => !p.badges.includes(b));
  next = { ...next, badges: [...p.badges, ...newBadges] };
  return { profile: next, reward: { xp, newBadges, streak, streakIncreased } };
}

function earnedBadges(p: UserProfile, r: LessonResult) {
  const out: string[] = [];
  if (p.completedLevels.length >= 1) out.push('first_lesson');
  if (r.mistakes === 0 && !r.practice) out.push('perfect');
  if (p.streak >= 3) out.push('streak_3');
  if (p.streak >= 7) out.push('streak_7');
  if (p.xp >= 100) out.push('xp_100');
  const u1 = curriculum[0].levels.every((l) => p.completedLevels.includes(l.id));
  if (u1) out.push('unit_1');
  if (allLevels.every((l) => p.completedLevels.includes(l.id))) out.push('all_levels');
  return out;
}

export function buyStreakFreeze(p: UserProfile): UserProfile | null {
  if (p.xp < STREAK_FREEZE_COST || p.streakFreezes >= MAX_STREAK_FREEZES) return null;
  return { ...p, xp: p.xp - STREAK_FREEZE_COST, streakFreezes: p.streakFreezes + 1 };
}

export function leagueTier(weeklyXp: number) {
  if (weeklyXp >= 150) return { name: 'Ouro', icon: '🥇', color: 'text-amber-500' };
  if (weeklyXp >= 60) return { name: 'Prata', icon: '🥈', color: 'text-slate-400' };
  return { name: 'Bronze', icon: '🥉', color: 'text-orange-700' };
}
