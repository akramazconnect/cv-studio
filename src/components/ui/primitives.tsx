import { useEffect, useState, type ReactNode } from 'react'
import { ChevronDown, ArrowUp, ArrowDown, Trash2, Plus } from 'lucide-react'

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="label">
        {label}
        {hint && <span className="ms-1.5 font-normal normal-case tracking-normal text-muted/80">· {hint}</span>}
      </span>
      {children}
    </label>
  )
}

export function Input({ value, onChange, placeholder, dir }: { value: string; onChange: (v: string) => void; placeholder?: string; dir?: 'ltr' | 'rtl' | 'auto' }) {
  return <input className="field" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} dir={dir} />
}

export function Textarea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return <textarea className="field" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} />
}

export function Group({ title, count, defaultOpen = false, children }: { title: string; count?: number; defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section className="border-b border-line">
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between px-5 py-3.5 text-start transition hover:bg-soft">
        <span className="flex items-center gap-2 text-[13.5px] font-bold text-ink">
          {title}
          {typeof count === 'number' && <span className="rounded-full bg-canvas px-1.5 text-[11px] font-semibold text-muted">{count}</span>}
        </span>
        <ChevronDown className={`h-4 w-4 text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="flex flex-col gap-3 px-5 pb-5">{children}</div>}
    </section>
  )
}

export function Card({ children, onUp, onDown, onRemove, labels }: { children: ReactNode; onUp?: () => void; onDown?: () => void; onRemove: () => void; labels: { up: string; down: string; remove: string } }) {
  return (
    <div className="rounded-xl border border-line bg-soft/60 p-3.5">
      <div className="mb-3 flex justify-end gap-0.5">
        <IconBtn onClick={onUp} disabled={!onUp} title={labels.up}>
          <ArrowUp className="h-3.5 w-3.5" />
        </IconBtn>
        <IconBtn onClick={onDown} disabled={!onDown} title={labels.down}>
          <ArrowDown className="h-3.5 w-3.5" />
        </IconBtn>
        <IconBtn onClick={onRemove} title={labels.remove} danger>
          <Trash2 className="h-3.5 w-3.5" />
        </IconBtn>
      </div>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  )
}

function IconBtn({ children, onClick, disabled, title, danger }: { children: ReactNode; onClick?: () => void; disabled?: boolean; title: string; danger?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className={`rounded-md p-1.5 text-muted transition disabled:opacity-30 ${danger ? 'hover:bg-red-50 hover:text-red-600' : 'hover:bg-white hover:text-ink'}`}
    >
      {children}
    </button>
  )
}

export function AddButton({ onClick, children }: { onClick: () => void; children: string }) {
  return (
    <button type="button" onClick={onClick} className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-line-2 py-2 text-[13px] font-semibold text-muted transition hover:border-ink hover:text-ink">
      <Plus className="h-3.5 w-3.5" />
      {children}
    </button>
  )
}

export function Row({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-2.5">{children}</div>
}

/** Comma-separated list editor that keeps the raw text while typing (so a trailing comma survives). */
const splitList = (v: string) => v.split(/[,،]/).map((s) => s.trim()).filter(Boolean)

export function ListInput({ value, onChange, multiline, rows = 2 }: { value: string[]; onChange: (v: string[]) => void; multiline?: boolean; rows?: number }) {
  const joined = value.join(', ')
  const [text, setText] = useState(joined)
  useEffect(() => {
    if (splitList(text).join(', ') !== joined) setText(joined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joined])
  const handle = (v: string) => {
    setText(v)
    onChange(splitList(v))
  }
  return multiline ? <textarea className="field" value={text} onChange={(e) => handle(e.target.value)} rows={rows} /> : <input className="field" value={text} onChange={(e) => handle(e.target.value)} />
}
