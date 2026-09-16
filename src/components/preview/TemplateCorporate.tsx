import { Bullets, ContactList, Photo, Section, fullName, has, range, type TemplateProps } from './parts'

/**
 * Corporate — single column, quiet rules, generous whitespace.
 * Reads well for HR / operations teams: nothing to decode, everything scannable.
 */
export default function TemplateCorporate({ data, t, theme }: TemplateProps) {
  const { personal: p } = data
  const Title = ({ children }: { children: string }) => (
    <h2 className="cv-caps mb-[0.5em] flex items-center gap-3 text-[0.72em] font-bold" style={{ color: 'var(--accent-ink)' }}>
      <span>{children}</span>
      <span className="h-px flex-1" style={{ background: 'var(--accent-soft)' }} />
    </h2>
  )

  return (
    <div className="px-[15mm] py-[13mm]">
      {/* Header */}
      <header className="flex items-start justify-between gap-8">
        <div className="flex items-center gap-5">
          {theme.showPhoto && <Photo src={p.photo} className="h-[64px] w-[64px] rounded-full" />}
          <div>
            <h1 className="cv-name text-[2.5em] font-extrabold leading-[1.05]">{fullName(p)}</h1>
            <p className="mt-[0.35em] text-[1.08em] font-medium" style={{ color: 'var(--accent-ink)' }}>
              {p.title}
            </p>
          </div>
        </div>
        <ContactList personal={p} className="mt-1 shrink-0 text-[0.85em] text-ink-2" iconClass="text-muted" />
      </header>

      <div className="mt-[1.4em] h-px w-full" style={{ background: 'var(--color-line)' }} />

      {data.summary && (
        <Section titleNode={<Title>{t.sections.profile}</Title>}>
          <p className="text-[1em] leading-[1.55] text-ink-2">{data.summary}</p>
        </Section>
      )}

      {has(data.experiences) && (
        <Section titleNode={<Title>{t.sections.experience}</Title>}>
          {data.experiences.map((e) => (
            <div key={e.id} className="cv-item">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-bold">
                  {e.role}
                  {e.company && <span className="font-medium text-muted"> · {e.company}</span>}
                </h3>
                <span className="shrink-0 text-[0.85em] tabular-nums text-muted">{range(e.start, e.end)}</span>
              </div>
              {e.location && <div className="text-[0.85em] text-muted">{e.location}</div>}
              <Bullets items={e.bullets} />
            </div>
          ))}
        </Section>
      )}

      {has(data.skillGroups) && (
        <Section titleNode={<Title>{t.sections.skills}</Title>}>
          <div className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-[0.45em]">
            {data.skillGroups.map((g) => (
              <div key={g.id} className="contents">
                <span className="font-semibold text-ink">{g.name}</span>
                <span className="text-ink-2">{g.skills.join('  ·  ')}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {has(data.projects) && (
        <Section titleNode={<Title>{t.sections.projects}</Title>}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-[0.7em]">
            {data.projects.map((pr) => (
              <div key={pr.id} className="cv-item !mt-0">
                <h3 className="font-bold">
                  {pr.name}
                  {pr.tags.length > 0 && <span className="ms-2 text-[0.8em] font-medium text-muted">{pr.tags.join(', ')}</span>}
                </h3>
                <p className="text-[0.95em] text-ink-2">{pr.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {has(data.education) && (
        <Section titleNode={<Title>{t.sections.education}</Title>}>
          {data.education.map((ed) => (
            <div key={ed.id} className="cv-item flex items-baseline justify-between gap-4">
              <div>
                <h3 className="font-bold">{ed.degree}</h3>
                <div className="text-[0.9em] text-muted">
                  {[ed.school, ed.location].filter(Boolean).join(' · ')}
                  {ed.note && <span> — {ed.note}</span>}
                </div>
              </div>
              <span className="shrink-0 text-[0.85em] tabular-nums text-muted">{range(ed.start, ed.end)}</span>
            </div>
          ))}
        </Section>
      )}

      <div className="mt-[1.6em] grid grid-cols-3 gap-8">
        {has(data.certifications) && (
          <Section className="!mt-0" titleNode={<Title>{t.sections.certifications}</Title>}>
            <ul className="flex flex-col gap-[0.35em] text-[0.92em]">
              {data.certifications.map((c) => (
                <li key={c.id}>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-muted">{[c.issuer, c.year].filter(Boolean).join(' · ')}</div>
                </li>
              ))}
            </ul>
          </Section>
        )}
        {has(data.languages) && (
          <Section className="!mt-0" titleNode={<Title>{t.sections.languages}</Title>}>
            <ul className="flex flex-col gap-[0.35em] text-[0.92em]">
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
          <Section className="!mt-0" titleNode={<Title>{t.sections.interests}</Title>}>
            <p className="text-[0.92em] text-ink-2">{data.interests.join(' · ')}</p>
          </Section>
        )}
      </div>
    </div>
  )
}
