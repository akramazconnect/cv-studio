import type { ReactNode } from 'react'
import { Github, Globe, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import type { CVData, Personal, Theme } from '../../types'
import type { Dict } from '../../i18n'

export interface TemplateProps {
  data: CVData
  t: Dict
  theme: Theme
  rtl: boolean
}

export const range = (start: string, end: string) => [start, end].filter(Boolean).join(' — ')

export const fullName = (p: Personal) => [p.firstName, p.lastName].filter(Boolean).join(' ')

export const has = <T,>(arr: T[] | undefined) => !!arr && arr.length > 0

/** Contact entries with icons — order matters for layout */
export function contactItems(p: Personal) {
  const items: { icon: typeof Mail; value: string; href?: string }[] = []
  if (p.email) items.push({ icon: Mail, value: p.email, href: `mailto:${p.email}` })
  if (p.phone) items.push({ icon: Phone, value: p.phone, href: `tel:${p.phone.replace(/\s/g, '')}` })
  if (p.location) items.push({ icon: MapPin, value: p.location })
  if (p.website) items.push({ icon: Globe, value: p.website, href: url(p.website) })
  if (p.linkedin) items.push({ icon: Linkedin, value: p.linkedin, href: url(p.linkedin) })
  if (p.github) items.push({ icon: Github, value: p.github, href: url(p.github) })
  return items
}

const url = (v: string) => (/^https?:\/\//i.test(v) ? v : `https://${v}`)

export function ContactList({
  personal,
  className = '',
  itemClass = '',
  iconClass = '',
  inline = false,
}: {
  personal: Personal
  className?: string
  itemClass?: string
  iconClass?: string
  inline?: boolean
}) {
  const items = contactItems(personal)
  return (
    <ul className={`${inline ? 'flex flex-wrap gap-x-4 gap-y-1' : 'flex flex-col gap-1'} ${className}`}>
      {items.map(({ icon: Icon, value, href }) => (
        <li key={value} className={`flex items-center gap-1.5 ${itemClass}`}>
          <Icon className={`h-[1em] w-[1em] shrink-0 ${iconClass}`} strokeWidth={1.75} />
          {href ? (
            <a href={href} className="no-underline text-inherit" dir="ltr">
              {value}
            </a>
          ) : (
            <span dir="auto">{value}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

export function Photo({ src, className = '' }: { src: string; className?: string }) {
  if (!src) return null
  return <img src={src} alt="" className={`object-cover ${className}`} />
}

export function Bullets({ items, className = '', markerClass = '' }: { items: string[]; className?: string; markerClass?: string }) {
  const list = items.filter((b) => b.trim())
  if (!list.length) return null
  return (
    <ul className={`mt-[0.35em] flex flex-col gap-[0.25em] ${className}`}>
      {list.map((b, i) => (
        <li key={i} className="flex gap-[0.6em]">
          <span className={`mt-[0.62em] h-[0.3em] w-[0.3em] shrink-0 rounded-full ${markerClass}`} style={{ background: 'var(--accent)' }} />
          <span className="text-ink-2">{b}</span>
        </li>
      ))}
    </ul>
  )
}

export function Chips({ items, className = '', chipClass = '' }: { items: string[]; className?: string; chipClass?: string }) {
  return (
    <div className={`flex flex-wrap gap-[0.35em] ${className}`}>
      {items.map((s) => (
        <span key={s} className={`rounded-md px-[0.55em] py-[0.15em] text-[0.88em] leading-[1.5] ${chipClass}`}>
          {s}
        </span>
      ))}
    </div>
  )
}

/** Generic section wrapper; each template provides its own title styling */
export function Section({ title, children, className = '', titleNode }: { title?: string; children: ReactNode; className?: string; titleNode?: ReactNode }) {
  return (
    <section className={`cv-section ${className}`}>
      {titleNode ?? (title ? <h2>{title}</h2> : null)}
      {children}
    </section>
  )
}
