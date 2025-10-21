export function Input(props: any) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${props.className || ""}`}
    />
  )
}
