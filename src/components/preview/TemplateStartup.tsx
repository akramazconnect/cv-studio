import { Bullets, ContactList, Photo, Section, fullName, has, range, type TemplateProps } from './parts'

/**
 * Startup — product-style: chips, soft cards, an accent pill headline.
 * Optimised for founders and tech leads skimming for stack + shipped things.
 */
export default function TemplateStartup({ data, t, theme }: TemplateProps) {
  const { personal: p } = data

  const Title = ({ children }: { children: string }) => (
    <h2 className="mb-[0.6em] flex items-center gap-2 text-[0.8em] font-extrabold tracking-wide">
      <span className="h-[0.5em] w-[0.5em] rounded-full" style={{ background: 'var(--accent)' }} />
      {children}
    </h2>
  )

  const Chip = ({ children }: { children: string }) => (
    <span className="rounded-full border px-[0.6em] py-[0.1em] text-[0.8em] font-medium leading-[1.55] text-ink-2" style={{ borderColor: 'var(--color-line)', background: 'white' }}>
      {children}
    </span>
  )

  return (
    <div className="px-[14mm] py-[12mm]">
      {/* Header card */}
      <header className="rounded-[18px] p-[5mm]" style={{ background: 'var(--accent-softer)' }}>
        <div className="flex items-center gap-5">
          {theme.showPhoto && p.photo && <Photo src={p.photo} className="h-[76px] w-[76px] rounded-full ring-4 ring-white" />}
          <div className="flex-1">
            <h1 className="cv-name text-[2.3em] font-extrabold leading-[1.05]">{fullName(p)}</h1>
            <span className="mt-[0.5em] inline-block rounded-full px-[0.9em] py-[0.25em] text-[0.9em] font-bold" style={{ background: 'white', color: 'var(--accent-ink)' }}>
              {p.title}
            </span>
          </div>
        </div>
        <ContactList personal={p} inline className="mt-[1em] text-[0.85em] text-ink-2" iconClass="text-muted" />
      </header>

      {data.summary && (
        <Section titleNode={<Title>{t.sections.profile}</Title>}>
          <p className="leading-[1.55] text-ink-2">{data.summary}</p>
        </Section>
      )}

      <div className="mt-[1.6em] grid grid-cols-[1fr_60mm] gap-x-[8mm]">
        {/* Main */}
        <div>
          {has(data.experiences) && (
            <Section className="!mt-0" titleNode={<Title>{t.sections.experience}</Title>}>
              {data.experiences.map((e) => (
                <div key={e.id} className="cv-item">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-bold">{e.role}</h3>
                    <span className="shrink-0 rounded-md px-[0.5em] text-[0.78em] font-semibold" style={{ background: 'var(--accent-soft)', color: 'var(--accent-ink)' }}>
                      {range(e.start, e.end)}
                    </span>
                  </div>
                  <div className="text-[0.9em] text-muted">{[e.company, e.location].filter(Boolean).join(' · ')}</div>
                  <Bullets items={e.bullets} />
                </div>
              ))}
            </Section>
          )}

          {has(data.projects) && (
            <Section titleNode={<Title>{t.sections.projects}</Title>}>
              <div className="flex flex-col gap-[0.5em]">
                {data.projects.map((pr) => (
                  <div key={pr.id} className="cv-item !mt-0 rounded-xl border px-[0.8em] py-[0.6em]" style={{ borderColor: 'var(--color-line)' }}>
                    <h3 className="font-bold">{pr.name}</h3>
                    <p className="text-[0.95em] text-ink-2">{pr.description}</p>
                    {pr.tags.length > 0 && (
                      <div className="mt-[0.45em] flex flex-wrap gap-[0.3em]">
                        {pr.tags.map((tag) => (
                          <Chip key={tag}>{tag}</Chip>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Side */}
        <div>
          {has(data.skillGroups) && (
            <Section className="!mt-0" titleNode={<Title>{t.sections.skills}</Title>}>
              <div className="flex flex-col gap-[0.8em]">
                {data.skillGroups.map((g) => (
                  <div key={g.id}>
                    <div className="mb-[0.3em] text-[0.82em] font-bold text-muted">{g.name}</div>
                    <div className="flex flex-wrap gap-[0.3em]">
                      {g.skills.map((s) => (
                        <Chip key={s}>{s}</Chip>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {has(data.education) && (
            <Section titleNode={<Title>{t.sections.education}</Title>}>
              {data.education.map((ed) => (
                <div key={ed.id} className="cv-item">
                  <h3 className="text-[0.95em] font-bold leading-snug">{ed.degree}</h3>
                  <div className="text-[0.85em] text-muted">
                    {[ed.school, range(ed.start, ed.end)].filter(Boolean).join(' · ')}
                  </div>
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
              <div className="flex flex-wrap gap-[0.3em]">
                {data.interests.map((i) => (
                  <Chip key={i}>{i}</Chip>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}
