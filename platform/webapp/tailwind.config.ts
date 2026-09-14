import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'var(--color-ink)',
          soft: 'var(--color-ink-soft)',
          muted: 'var(--color-ink-muted)',
        },
        trust: {
          DEFAULT: 'var(--color-trust)',
          soft: 'var(--color-trust-soft)',
          faint: 'var(--color-trust-faint)',
        },
        risk: {
          DEFAULT: 'var(--color-risk)',
          elevated: 'var(--color-risk-elevated)',
        },
        cut: {
          DEFAULT: 'var(--color-cut)',
          soft: 'var(--color-cut-soft)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          raised: 'var(--color-surface-raised)',
          sunken: 'var(--color-surface-sunken)',
          canvas: 'var(--color-surface-canvas)',
        },
        status: {
          info: 'var(--color-status-info)',
          watch: 'var(--color-status-watch)',
          fail: 'var(--color-status-fail)',
          ok: 'var(--color-status-ok)',
          candidate: 'var(--color-status-candidate)',
          held: 'var(--color-status-held)',
        },
      },
      fontFamily: {
        sans: ['var(--font-plex)', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        panel: '4px',
      },
      boxShadow: {
        panel: 'var(--shadow-panel)',
      },
    },
  },
  plugins: [],
};

export default config;
