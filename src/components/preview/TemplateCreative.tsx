import { Bullets, ContactList, Photo, Section, has, range, type TemplateProps } from './parts'

/**
 * Creative — editorial layout: serif display name, blush accent, asymmetric columns.
 * Shows taste without shouting; typography does the work.
 */
export default function TemplateCreative({ data, t, theme }: TemplateProps) {
  const { personal: p } = data

  const Title = ({ children }: { children: string }) => (
    <h2 className="mb-[0.7em]">
      <span className="cv-caps text-[0.7em] font-bold text-ink">{children}</span>
      <span className="mt-[0.5em] block h-[2px] w-[2.2em] rounded-full" style={{ background: 'var(--accent)' }} />
    </h2>
  )

  return (
    <div className="px-[15mm] pt-[15mm] pb-[12mm]">
      {/* Header */}
      <header className="relative">
        <span className="absolute -top-[6mm] start-0 h-[5px] w-[14mm] rounded-full" style={{ background: 'var(--accent)' }} />
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="cv-name font-serif text-[3.2em] font-light leading-[1]">
              {p.firstName} <span className="font-medium">{p.lastName}</span>
            </h1>
            <p className="font-serif mt-[0.5em] text-[1.25em] italic leading-tight" style={{ color: 'var(--accent-ink)' }}>
              {p.title}
            </p>
          </div>
          {theme.showPhoto && p.photo && <Photo src={p.photo} className="h-[84px] w-[84px] rounded-[18px]" />}
        </div>
        <ContactList personal={p} inline className="mt-[1.6em] text-[0.85em] text-ink-2" iconClass="text-muted" />
      </header>

      <div className="mt-[1.5em] h-px w-full" style={{ background: 'var(--color-line)' }} />

      <div className="mt-[1.6em] grid grid-cols-[56mm_1fr] gap-x-[10mm]">
        {/* Left column */}
        <div>
          {has(data.skillGroups) && (
            <Section className="!mt-0" titleNode={<Title>{t.sections.skills}</Title>}>
              <div className="flex flex-col gap-[0.9em]">
                {data.skillGroups.map((g) => (
                  <div key={g.id}>
                    <div className="mb-[0.2em] text-[0.85em] font-bold">{g.name}</div>
                    <div className="text-[0.9em] leading-[1.6] text-ink-2">{g.skills.join(', ')}</div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {has(data.education) && (
            <Section titleNode={<Title>{t.sections.education}</Title>}>
              {data.education.map((ed) => (
                <div key={ed.id} className="cv-item">
                  <div className="text-[0.8em] text-muted">{range(ed.start, ed.end)}</div>
                  <h3 className="text-[0.95em] font-bold leading-snug">{ed.degree}</h3>
                  <div className="text-[0.85em] text-muted">{[ed.school, ed.location].filter(Boolean).join(' · ')}</div>
                </div>
              ))}
            </Section>
          )}

          {has(data.certifications) && (
            <Section titleNode={<Title>{t.sections.certifications}</Title>}>
              <ul className="flex flex-col gap-[0.45em] text-[0.88em]">
                {data.certifications.map((c) => (
                  <li key={c.id}>
                    <div className="font-semibold leading-snug">{c.name}</div>
                    <div className="text-muted">{[c.issuer, c.year].filter(Boolean).join(' · ')}</div>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {has(data.languages) && (
            <Section titleNode={<Title>{t.sections.languages}</Title>}>
              <ul className="flex flex-col gap-[0.3em] text-[0.88em]">
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
            <Section titleNode={<Title>{t.sections.interests}</Title>}>
              <p className="text-[0.88em] text-ink-2">{data.interests.join(' · ')}</p>
            </Section>
          )}
        </div>

        {/* Right column */}
        <div>
          {data.summary && (
            <Section className="!mt-0" titleNode={<Title>{t.sections.profile}</Title>}>
              <p className="font-serif text-[1.08em] leading-[1.6] text-ink-2">{data.summary}</p>
            </Section>
          )}

          {has(data.experiences) && (
            <Section titleNode={<Title>{t.sections.experience}</Title>}>
              {data.experiences.map((e) => (
                <div key={e.id} className="cv-item">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-bold">{e.role}</h3>
                    <span className="shrink-0 text-[0.82em] text-muted">{range(e.start, e.end)}</span>
                  </div>
                  <div className="text-[0.9em]" style={{ color: 'var(--accent-ink)' }}>
                    {[e.company, e.location].filter(Boolean).join(' · ')}
                  </div>
                  <Bullets items={e.bullets} />
                </div>
              ))}
            </Section>
          )}

          {has(data.projects) && (
            <Section titleNode={<Title>{t.sections.projects}</Title>}>
              {data.projects.map((pr) => (
                <div key={pr.id} className="cv-item">
                  <h3 className="font-bold">{pr.name}</h3>
                  <p className="text-[0.95em] text-ink-2">{pr.description}</p>
                  {pr.tags.length > 0 && (
                    <div className="mt-[0.3em] flex flex-wrap gap-[0.3em]">
                      {pr.tags.map((tag) => (
                        <span key={tag} className="rounded-full px-[0.6em] py-[0.05em] text-[0.75em] font-semibold" style={{ background: 'var(--accent-soft)', color: 'var(--accent-ink)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}
