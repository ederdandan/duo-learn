import { LogOut, Snowflake, Trash2 } from 'lucide-react';
import type { AgeGroup } from '../types';
import { useStore } from '../store/AppStore';
import { allLevels } from '../data/curriculum';
import { AGE_GROUPS, BADGES, MAX_STREAK_FREEZES, STREAK_FREEZE_COST, buyStreakFreeze } from '../lib/rules';
import { Button } from '../components/Button';
import { ExportButton, ImportButton } from '../components/BackupControls';

export function ProfilePage() {
  const { active, updateActive, selectProfile, removeProfile } = useStore();
  if (!active) return null;

  const canBuy = active.xp >= STREAK_FREEZE_COST && active.streakFreezes < MAX_STREAK_FREEZES;
  const progress = Math.round((active.completedLevels.length / allLevels.length) * 100);

  function remove() {
    if (confirm(`Apagar o perfil de ${active!.name}? O progresso será perdido.`)) removeProfile(active!.id);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <span className="text-7xl">{active.avatar}</span>
        <div>
          <h1 className="text-2xl font-extrabold">{active.name}</h1>
          <p className="text-slate-500">
            {AGE_GROUPS[active.ageGroup].emoji} Modo {AGE_GROUPS[active.ageGroup].label}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="XP total" value={active.xp} icon="⚡" />
        <Stat label="Sequência" value={active.streak} icon="🔥" />
        <Stat label="Esta semana" value={active.weeklyXp} icon="📅" />
        <Stat label="Trilha" value={`${progress}%`} icon="🗺️" />
      </div>

      <section>
        <h2 className="mb-3 text-lg font-extrabold">Conquistas</h2>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {Object.entries(BADGES).map(([id, b]) => {
            const has = active.badges.includes(id);
            return (
              <div
                key={id}
                title={b.description}
                className={`rounded-2xl border-2 p-3 text-center ${has ? 'border-amber-300 bg-amber-50' : 'border-slate-200 opacity-40 grayscale'}`}
              >
                <div className="text-3xl">{b.icon}</div>
                <p className="text-xs font-extrabold">{b.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border-2 border-slate-200 bg-white p-5">
        <h2 className="mb-1 flex items-center gap-2 text-lg font-extrabold">
          <Snowflake className="size-5 text-sky-500" /> Bloqueio de sequência
        </h2>
        <p className="mb-3 text-sm text-slate-500">
          Protege sua sequência se você ficar um dia sem estudar. Você tem {active.streakFreezes}/{MAX_STREAK_FREEZES}.
        </p>
        <Button
          variant="secondary"
          disabled={!canBuy}
          onClick={() => updateActive((p) => buyStreakFreeze(p) ?? p)}
        >
          Comprar por {STREAK_FREEZE_COST} XP
        </Button>
      </section>

      <section className="rounded-3xl border-2 border-slate-200 bg-white p-5">
        <h2 className="mb-2 text-lg font-extrabold">Modo de estudo</h2>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(AGE_GROUPS) as AgeGroup[]).map((g) => (
            <button
              key={g}
              onClick={() => updateActive((p) => ({ ...p, ageGroup: g }))}
              className={`rounded-xl border-2 px-3 py-2 font-bold ${
                active.ageGroup === g ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200'
              }`}
            >
              {AGE_GROUPS[g].emoji} {AGE_GROUPS[g].label}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border-2 border-slate-200 bg-white p-5">
        <h2 className="mb-1 text-lg font-extrabold">Backup da família</h2>
        <p className="mb-3 text-sm text-slate-500">
          Os dados ficam só neste navegador. Exporte um arquivo para guardar ou levar para outro aparelho.
        </p>
        <div className="flex flex-wrap gap-4 font-bold text-brand-600">
          <ExportButton className="underline" />
          <ImportButton className="underline" />
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={() => selectProfile(null)}>
          <LogOut className="size-5" /> Trocar de perfil
        </Button>
        <Button variant="ghost" onClick={remove} className="text-rose-500">
          <Trash2 className="size-5" /> Apagar perfil
        </Button>
      </div>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: number | string; icon: string }) {
  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white p-3">
      <p className="text-2xl font-extrabold">
        {icon} {value}
      </p>
      <p className="text-xs font-bold uppercase text-slate-400">{label}</p>
    </div>
  );
}
