interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
}

export default function ActionButton({ children, ...rest }: ActionButtonProps) {
  return (
    <button
      className="w-full py-3 rounded-md bg-[var(--button-background)] text-[22px] text-white mt-2 hover:bg-[var(--button-background-hover)] transition-all disabled:cursor-not-allowed"
      {...rest}
    >
      {children}
    </button>
  )
}
