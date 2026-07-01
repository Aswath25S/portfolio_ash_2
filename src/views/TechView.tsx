import { content, TECH_HASHES } from '../data/content';
import type { Theme } from '../data/theme';
import { useHover } from '../hooks/useHover';

interface TechViewProps {
  t: Theme;
}

function ProjectCard({ pr, t }: { pr: (typeof content.tech.projects)[number]; t: Theme }) {
  const [hovered, handlers] = useHover();
  return (
    <div
      {...handlers}
      style={{
        border: `1px solid ${hovered ? t.accent : t.border}`,
        borderRadius: 8,
        background: t.surface,
        padding: 18,
        transition: 'transform .2s, border-color .2s',
        transform: hovered ? 'translateY(-4px)' : 'none',
      }}
    >
      <div style={{ color: t.accent2, fontSize: 11.5 }}>~/projects/</div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16.5, fontWeight: 600, color: t.fg, marginTop: 2, lineHeight: 1.2 }}>{pr.name}</div>
      <div style={{ fontSize: 11.5, color: t.muted, marginTop: 4 }}>{pr.meta}</div>
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 5 }}>
        {pr.points.map((pt, i) => (
          <div key={i} style={{ fontSize: 13, lineHeight: 1.5, color: t.fg, paddingLeft: 15, textIndent: '-15px' }}>
            <span style={{ color: t.accent }}>{'> '}</span>{pt}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechView({ t }: TechViewProps) {
  const cur = content.tech;
  const roles = cur.roles.map((r, i) => ({ ...r, hash: TECH_HASHES[i % TECH_HASHES.length] }));

  return (
    <div
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(120,255,180,.035) 0px, rgba(120,255,180,.035) 1px, transparent 1px, transparent 3px)',
        animation: 'riseIn .5s ease both',
      }}
    >
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '44px 22px 8px', fontFamily: "'JetBrains Mono', monospace" }}>
        <div style={{ border: `1px solid ${t.border}`, borderRadius: 12, overflow: 'hidden', background: t.surface, boxShadow: '0 24px 70px rgba(0,0,0,.35)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: `1px solid ${t.border}` }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f56' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#27c93f' }} />
            <span style={{ marginLeft: 12, fontSize: 12.5, color: t.muted }}>aswath@jhu — ~/tech — zsh</span>
          </div>
          <div style={{ padding: '26px 22px' }}>
            <div style={{ fontSize: 13.5, color: t.muted }}>
              <span style={{ color: t.accent }}>aswath@jhu</span>:<span style={{ color: t.accent2 }}>~</span>$ whoami
            </div>
            <div style={{ margin: '8px 0 24px' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(30px,5vw,58px)', fontWeight: 700, color: t.fg, lineHeight: 1.02, letterSpacing: '-.01em' }}>
                Aswath Suresh
              </div>
              <div style={{ color: t.accent, fontSize: 15, marginTop: 8 }}>// Founding Engineer</div>
            </div>
            <div style={{ fontSize: 13.5, color: t.muted }}>
              <span style={{ color: t.accent }}>aswath@jhu</span>:~$ cat about.txt
            </div>
            <div style={{ maxWidth: '72ch', fontSize: 15, lineHeight: 1.65, color: t.fg, marginTop: 8 }}>
              {cur.intro}
              <span style={{ display: 'inline-block', width: 9, height: 16, background: t.accent, marginLeft: 5, verticalAlign: '-2px', animation: 'blink 1s steps(1) infinite' }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '26px 22px', fontFamily: "'JetBrains Mono', monospace" }}>
        <div style={{ fontSize: 13, color: t.muted, marginBottom: 14 }}>
          <span style={{ color: t.accent }}>$</span> stats --summary
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 1, background: t.border, border: `1px solid ${t.border}`, borderRadius: 10, overflow: 'hidden' }}>
          {cur.metrics.map((m, i) => (
            <div key={i} style={{ background: t.surface, padding: '18px 18px 20px' }}>
              <div style={{ color: t.accent, fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(26px,3vw,34px)', fontWeight: 700, lineHeight: 1 }}>{m.value}</div>
              <div style={{ color: t.muted, fontSize: 12.5, marginTop: 8, lineHeight: 1.4 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '32px 22px', fontFamily: "'JetBrains Mono', monospace" }}>
        <div style={{ fontSize: 13, color: t.muted, marginBottom: 22 }}>
          <span style={{ color: t.accent }}>$</span> git log --experience
        </div>
        <div>
          {roles.map((r, i) => (
            <div key={i} style={{ position: 'relative', padding: '0 0 26px 30px', borderLeft: `2px solid ${t.border}`, marginLeft: 6 }}>
              <span style={{ position: 'absolute', left: -7, top: 3, width: 11, height: 11, borderRadius: '50%', background: t.accent, boxShadow: `0 0 12px ${t.accent}` }} />
              <div style={{ fontSize: 12.5, color: t.accent2 }}>commit {r.hash}</div>
              <div style={{ fontSize: 12.5, color: t.muted }}>Date: {r.dates} · {r.place}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, fontWeight: 600, color: t.fg, marginTop: 9 }}>
                {r.role} <span style={{ color: t.accent }}>@ {r.org}</span>
              </div>
              <div style={{ fontSize: 12.5, color: t.muted, marginTop: 2 }}>{r.orgDesc}</div>
              <div style={{ marginTop: 11, display: 'flex', flexDirection: 'column', gap: 5 }}>
                {r.points.map((pt, j) => (
                  <div key={j} style={{ fontSize: 14, lineHeight: 1.55, color: t.fg, paddingLeft: 16, textIndent: '-16px' }}>
                    <span style={{ color: t.accent }}>+ </span>{pt}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '22px 22px', fontFamily: "'JetBrains Mono', monospace" }}>
        <div style={{ fontSize: 13, color: t.muted, marginBottom: 18 }}>
          <span style={{ color: t.accent }}>$</span> ls ~/projects
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 14 }}>
          {cur.projects.map((pr, i) => (
            <ProjectCard key={i} pr={pr} t={t} />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '30px 22px 20px', fontFamily: "'JetBrains Mono', monospace" }}>
        <div style={{ fontSize: 13, color: t.muted, marginBottom: 16 }}>
          <span style={{ color: t.accent }}>$</span> cat toolkit.json
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, alignItems: 'center' }}>
            <span style={{ color: t.accent2, fontSize: 13, marginRight: 4 }}>"technical":</span>
            {cur.skillsTech.map((s, i) => (
              <span key={i} style={{ border: `1px solid ${t.border}`, background: t.surface, padding: '6px 12px', borderRadius: 6, fontSize: 13, color: t.fg }}>
                {s}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, alignItems: 'center' }}>
            <span style={{ color: t.accent2, fontSize: 13, marginRight: 4 }}>"domain":</span>
            {cur.skillsDomain.map((s, i) => (
              <span key={i} style={{ border: `1px solid ${t.accent}`, color: t.accent, padding: '6px 12px', borderRadius: 6, fontSize: 13 }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
