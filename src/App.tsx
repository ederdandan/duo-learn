import { useEffect, useState } from 'react';
import { Map, Trophy, User } from 'lucide-react';
import { useStore } from './store/AppStore';
import { StatsBar } from './components/StatsBar';
import { ProfilesPage } from './pages/ProfilesPage';
import { PathPage } from './pages/PathPage';
import { LessonPage } from './pages/LessonPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ProfilePage } from './pages/ProfilePage';
import type { AgeGroup } from './types';

type Tab = 'path' | 'ranking' | 'profile';

// Tamanho base da fonte por faixa etária: como o Tailwind usa rem, a interface inteira escala.
const FONT_SIZE: Record<AgeGroup, string> = { kids: '17px', adults: '16px', seniors: '20px' };

const TABS: Array<{ id: Tab; label: string; icon: typeof Map }> = [
  { id: 'path', label: 'Trilha', icon: Map },
  { id: 'ranking', label: 'Ranking', icon: Trophy },
  { id: 'profile', label: 'Perfil', icon: User },
];

export default function App() {
  const { active } = useStore();
  const [tab, setTab] = useState<Tab>('path');
  const [lesson, setLesson] = useState<{ levelId: string; practice: boolean } | null>(null);

  useEffect(() => {
    document.documentElement.style.fontSize = active ? FONT_SIZE[active.ageGroup] : '';
  }, [active?.ageGroup]);

  // Ao trocar de perfil, volta para a trilha.
  useEffect(() => {
    setTab('path');
    setLesson(null);
  }, [active?.id]);

  // Cada tela nova começa do topo.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab, lesson]);

  if (!active) return <ProfilesPage />;

  if (lesson) return <LessonPage {...lesson} onExit={() => setLesson(null)} />;

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-slate-200 bg-slate-50/95 px-4 py-3 backdrop-blur">
        <span className="flex items-center gap-2 font-extrabold">
          <span className="text-2xl">{active.avatar}</span>
          <span className="hidden sm:inline">{active.name}</span>
        </span>
        <StatsBar profile={active} />
      </header>

      <main className="flex-1 px-4 py-6">
        {tab === 'path' && <PathPage onStart={(levelId, practice) => setLesson({ levelId, practice })} />}
        {tab === 'ranking' && <LeaderboardPage />}
        {tab === 'profile' && <ProfilePage />}
      </main>

      <nav className="sticky bottom-0 grid grid-cols-3 border-t-2 border-slate-200 bg-white">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex flex-col items-center gap-1 py-3 text-xs font-extrabold uppercase ${
              tab === id ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon className="size-6" />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
