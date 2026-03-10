import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export const SettingsPage = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="page settings-page">
      <h2>Settings</h2>
      <section className="settings-section">
        <h3>Appearance</h3>
        <div className="setting-row">
          <span>Theme</span>
          <div className="theme-toggle">
            <button
              type="button"
              className={theme === 'light' ? 'active' : ''}
              onClick={() => setTheme('light')}
            >
              Light
            </button>
            <button
              type="button"
              className={theme === 'dark' ? 'active' : ''}
              onClick={() => setTheme('dark')}
            >
              Dark
            </button>
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h3>About</h3>
        <p>
          This project management dashboard demonstrates routing, Redux state management,
          drag-and-drop, charts, forms with validation, and a rich text editor.
        </p>
      </section>
    </div>
  );
};

