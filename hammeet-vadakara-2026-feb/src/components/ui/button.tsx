import * as React from "react"

export function Button({ children, className = "", variant = "default", ...props }: any) {
  const base =
    "px-4 py-2 rounded-lg text-sm font-medium transition shadow hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
  const variants: Record<string, string> = {
    default: "bg-amber-500 hover:bg-amber-600 text-black",
    outline: "border border-slate-400 text-slate-200 hover:bg-slate-800",
    ghost: "text-slate-200 hover:bg-slate-800"
  }
  return (
    <button className={`${base} ${variants[variant] || ""} ${className}`} {...props}>
      {children}
    </button>
  )
}
