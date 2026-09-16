import { Bullets, ContactList, Photo, Section, fullName, has, range, type TemplateProps } from './parts'

/**
 * Tech — tinted sidebar with the skill matrix, monospace metadata.
 * Built for infrastructure / support roles where the skills column is what gets read first.
 */
export default function TemplateTech({ data, t, theme }: TemplateProps) {
  const { personal: p } = data

  const SideTitle = ({ children }: { children: string }) => (
    <h2 className="cv-caps mb-[0.6em] text-[0.7em] font-bold" style={{ color: 'var(--accent-ink)' }}>
      {children}
    </h2>
  )
  const MainTitle = ({ children }: { children: string }) => (
    <h2 className="mb-[0.5em] flex items-center gap-2 text-[0.95em] font-extrabold">
      <span className="inline-block h-[0.9em] w-[3px] rounded-full" style={{ background: 'var(--accent)' }} />
      {children}
    </h2>
  )

  return (
    <div className="flex min-h-[297mm]">
      {/* Sidebar */}
      <aside className="w-[66mm] shrink-0 px-[8mm] py-[12mm]" style={{ background: 'var(--accent-softer)' }}>
        {theme.showPhoto && p.photo && <Photo src={p.photo} className="mb-5 h-[88px] w-[88px] rounded-2xl" />}
        <h1 className="cv-name text-[1.9em] font-extrabold leading-[1.1]">{fullName(p)}</h1>
        <p className="mt-[0.5em] text-[0.95em] font-semibold leading-snug" style={{ color: 'var(--accent-ink)' }}>
          {p.title}
        </p>

        <Section titleNode={<SideTitle>{t.sections.contact}</SideTitle>}>
          <ContactList personal={p} className="text-[0.85em] text-ink-2" iconClass="text-muted" />
        </Section>

        {has(data.skillGroups) && (
          <Section titleNode={<SideTitle>{t.sections.skills}</SideTitle>}>
            <div className="flex flex-col gap-[0.9em]">
              {data.skillGroups.map((g) => (
                <div key={g.id}>
                  <div className="mb-[0.3em] text-[0.85em] font-bold">{g.name}</div>
                  <div className="flex flex-wrap gap-[0.3em]">
                    {g.skills.map((s) => (
                      <span key={s} className="font-mono rounded border bg-white px-[0.45em] py-[0.1em] text-[0.74em] leading-[1.6] text-ink-2" style={{ borderColor: 'var(--accent-soft)' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {has(data.certifications) && (
          <Section titleNode={<SideTitle>{t.sections.certifications}</SideTitle>}>
            <ul className="flex flex-col gap-[0.5em] text-[0.85em]">
              {data.certifications.map((c) => (
                <li key={c.id}>
                  <div className="font-semibold leading-snug">{c.name}</div>
                  <div className="font-mono text-[0.85em] text-muted">{[c.issuer, c.year].filter(Boolean).join(' · ')}</div>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {has(data.languages) && (
          <Section titleNode={<SideTitle>{t.sections.languages}</SideTitle>}>
            <ul className="flex flex-col gap-[0.3em] text-[0.85em]">
              {data.languages.map((l) => (
                <li key={l.id} className="flex justify-between gap-2">
                  <span className="font-semibold">{l.name}</span>
                  <span className="text-muted">{l.level}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {has(data.interests) && (
          <Section titleNode={<SideTitle>{t.sections.interests}</SideTitle>}>
            <p className="text-[0.85em] text-ink-2">{data.interests.join(' · ')}</p>
          </Section>
        )}
      </aside>

      {/* Main */}
      <main className="flex-1 px-[10mm] py-[12mm]">
        {data.summary && (
          <Section titleNode={<MainTitle>{t.sections.profile}</MainTitle>}>
            <p className="leading-[1.6] text-ink-2">{data.summary}</p>
          </Section>
        )}

        {has(data.experiences) && (
          <Section titleNode={<MainTitle>{t.sections.experience}</MainTitle>}>
            {data.experiences.map((e) => (
              <div key={e.id} className="cv-item">
                <div className="font-mono text-[0.78em] tracking-wide text-muted">
                  {range(e.start, e.end)}
                  {e.location && ` · ${e.location}`}
                </div>
                <h3 className="mt-[0.1em] font-bold">
                  {e.role}
                  {e.company && <span className="font-medium text-muted"> — {e.company}</span>}
                </h3>
                <Bullets items={e.bullets} />
              </div>
            ))}
          </Section>
        )}

        {has(data.projects) && (
          <Section titleNode={<MainTitle>{t.sections.projects}</MainTitle>}>
            {data.projects.map((pr) => (
              <div key={pr.id} className="cv-item">
                <h3 className="font-bold">
                  {pr.name}
                  {pr.tags.length > 0 && <span className="font-mono ms-2 text-[0.75em] font-normal text-muted">[{pr.tags.join(', ')}]</span>}
                </h3>
                <p className="text-[0.95em] text-ink-2">{pr.description}</p>
              </div>
            ))}
          </Section>
        )}

        {has(data.education) && (
          <Section titleNode={<MainTitle>{t.sections.education}</MainTitle>}>
            {data.education.map((ed) => (
              <div key={ed.id} className="cv-item">
                <div className="font-mono text-[0.78em] tracking-wide text-muted">{range(ed.start, ed.end)}</div>
                <h3 className="font-bold">{ed.degree}</h3>
                <div className="text-[0.9em] text-muted">
                  {[ed.school, ed.location].filter(Boolean).join(' · ')}
                  {ed.note && <span> — {ed.note}</span>}
                </div>
              </div>
            ))}
          </Section>
        )}
      </main>
    </div>
  )
}
