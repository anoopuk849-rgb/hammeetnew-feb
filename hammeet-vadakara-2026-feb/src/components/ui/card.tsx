import * as React from "react"

export function Card({ children, className = "" }: any) {
  return <div className={`bg-slate-900/40 rounded-xl p-4 ${className}`}>{children}</div>
}

export function CardHeader({ children }: any) {
  return <div className="mb-2 border-b border-slate-700 pb-2">{children}</div>
}

export function CardTitle({ children }: any) {
  return <h4 className="font-semibold text-lg">{children}</h4>
}

export function CardContent({ children }: any) {
  return <div className="text-sm text-slate-300 space-y-2">{children}</div>
}
