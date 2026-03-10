import { useEffect } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectPage } from './pages/ProjectPage';
import { SettingsPage } from './pages/SettingsPage';

export const App = () => {
  useEffect(() => {
    const stored = localStorage.getItem('pmdb-theme');
    if (stored === 'light' || stored === 'dark') {
      document.body.dataset.theme = stored;
    }
  }, []);

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Project Management Dashboard</h1>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
};

