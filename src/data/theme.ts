export type ViewId = 'landing' | 'tech' | 'consulting' | 'leadership' | 'reading';
export type Mode = 'dark' | 'light';

export interface Palette {
  bg: string;
  surface: string;
  fg: string;
  muted: string;
  accent: string;
  accent2: string;
  border: string;
  navBg: string;
  accentText: string;
}

export interface Fonts {
  head: string;
  body: string;
  mono: string;
}

export interface Theme extends Palette, Fonts {}

export const FONTS: Record<ViewId, Fonts> = {
  tech: { head: "'Space Grotesk'", body: "'JetBrains Mono'", mono: "'JetBrains Mono'" },
  consulting: { head: "'Spectral'", body: "'Libre Franklin'", mono: "'Space Mono'" },
  leadership: { head: "'Instrument Serif'", body: "'Newsreader'", mono: "'Work Sans'" },
  reading: { head: "'Bricolage Grotesque'", body: "'Spectral'", mono: "'Space Mono'" },
  landing: { head: "'Bricolage Grotesque'", body: "'Space Grotesk'", mono: "'Space Grotesk'" },
};

export const PAL: Record<ViewId, Partial<Record<Mode, Palette>>> = {
  tech: {
    dark: { bg: '#05080a', surface: '#0b1013', fg: '#d8f5e7', muted: '#6f8a80', accent: '#39ff14', accent2: '#00e5ff', border: '#16241f', navBg: 'rgba(5,8,10,.82)', accentText: '#05080a' },
    light: { bg: '#eef3f0', surface: '#ffffff', fg: '#0b1013', muted: '#4f6b60', accent: '#0a8f3c', accent2: '#0782a0', border: '#cdddd4', navBg: 'rgba(238,243,240,.85)', accentText: '#ffffff' },
  },
  consulting: {
    light: { bg: '#ffffff', surface: '#f5f7fb', fg: '#0f2440', muted: '#5b6b82', accent: '#1a4d8f', accent2: '#b8912f', border: '#dde3ec', navBg: 'rgba(255,255,255,.85)', accentText: '#ffffff' },
    dark: { bg: '#081120', surface: '#0f1f38', fg: '#e8eef7', muted: '#8ea3bf', accent: '#5b9bdc', accent2: '#d8b25a', border: '#1c3352', navBg: 'rgba(8,17,32,.85)', accentText: '#081120' },
  },
  leadership: {
    light: { bg: '#f6f0e6', surface: '#fbf7ef', fg: '#2a2620', muted: '#7a6f5f', accent: '#c0553b', accent2: '#4a6b57', border: '#e4dccc', navBg: 'rgba(246,240,230,.85)', accentText: '#ffffff' },
    dark: { bg: '#201c17', surface: '#2a2620', fg: '#f0e8da', muted: '#a89a86', accent: '#e07a5f', accent2: '#82a58c', border: '#3a342b', navBg: 'rgba(32,28,23,.85)', accentText: '#201c17' },
  },
  reading: {
    light: { bg: '#f3efe6', surface: '#ffffff', fg: '#141210', muted: '#6b6459', accent: '#ff3b6b', accent2: '#2d5bff', border: '#e0d8c8', navBg: 'rgba(243,239,230,.85)', accentText: '#ffffff' },
    dark: { bg: '#0e0d12', surface: '#17151d', fg: '#f2eee4', muted: '#9a93a6', accent: '#ff4d79', accent2: '#5b7bff', border: '#272430', navBg: 'rgba(14,13,18,.85)', accentText: '#0e0d12' },
  },
  landing: {
    dark: { bg: '#0c0c0f', surface: '#151519', fg: '#f4f2ea', muted: '#8a8780', accent: '#f4f2ea', accent2: '#39ff14', border: '#26262c', navBg: 'transparent', accentText: '#0c0c0f' },
    light: { bg: '#f4f2ea', surface: '#ffffff', fg: '#141210', muted: '#6b6459', accent: '#141210', accent2: '#c0553b', border: '#ddd8cc', navBg: 'transparent', accentText: '#ffffff' },
  },
};

export function themeFor(view: ViewId, mode: Mode, techAccent?: string): Theme {
  const base = PAL[view] ?? PAL.landing;
  const pal = base[mode] ?? base.dark ?? base.light!;
  const t: Theme = { ...pal, ...(FONTS[view] ?? FONTS.landing) };
  if (view === 'tech' && techAccent) t.accent = techAccent;
  return t;
}

export interface CategoryMeta {
  id: ViewId;
  name: string;
  num: string;
  tagline: string;
  panelBg: string;
  panelFg: string;
  panelBorder: string;
  font: string;
}

export const META: Record<Exclude<ViewId, 'landing'>, CategoryMeta> = {
  tech: { id: 'tech', name: 'Tech', num: '01', tagline: 'AI products, trading models, and full-stack systems.', panelBg: '#06090b', panelFg: '#39ff14', panelBorder: '#16241f', font: "'JetBrains Mono'" },
  consulting: { id: 'consulting', name: 'Consulting', num: '02', tagline: 'Market sizing and GTM strategy for startups & climate tech.', panelBg: '#0f2440', panelFg: '#ffffff', panelBorder: '#24406a', font: "'Spectral'" },
  leadership: { id: 'leadership', name: 'Leadership', num: '03', tagline: "Running Hopkins’ largest orgs, events, and case competitions.", panelBg: '#e8dcc8', panelFg: '#2a2620', panelBorder: '#d3c4a8', font: "'Instrument Serif'" },
  reading: { id: 'reading', name: 'Other Stuff', num: '04', tagline: 'The books, films, and detours between projects.', panelBg: '#17151d', panelFg: '#ff8fb0', panelBorder: '#2b2836', font: "'Bricolage Grotesque'" },
};
