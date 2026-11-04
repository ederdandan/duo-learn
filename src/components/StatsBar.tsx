import { Flame, Heart, Zap } from 'lucide-react';
import type { UserProfile } from '../types';
import { MAX_HEARTS, msToNextHeart } from '../lib/rules';
import { useNow } from '../lib/useNow';

export function formatMs(ms: number) {
  const m = Math.floor(ms / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function StatsBar({ profile }: { profile: UserProfile }) {
  const now = useNow(1000);
  const next = msToNextHeart(profile, now);
  return (
    <div className="flex items-center gap-4 font-extrabold">
      <span className="flex items-center gap-1 text-orange-500" title="Dias seguidos">
        <Flame className="size-5" fill="currentColor" /> {profile.streak}
      </span>
      <span className="flex items-center gap-1 text-amber-500" title="XP total">
        <Zap className="size-5" fill="currentColor" /> {profile.xp}
      </span>
      <span
        className="flex items-center gap-1 text-rose-500"
        title={next !== null ? `Próximo coração em ${formatMs(next)}` : 'Corações cheios'}
      >
        <Heart className="size-5" fill="currentColor" /> {profile.hearts}
        {profile.hearts < MAX_HEARTS && next !== null && (
          <span className="text-xs font-bold text-slate-400">{formatMs(next)}</span>
        )}
      </span>
    </div>
  );
}
