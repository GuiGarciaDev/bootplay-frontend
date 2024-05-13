import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string
}

export default function Input({ title, ...rest }: InputProps) {
  return (
    <label
      className={`flex flex-col w-full text-[16px] text-[var(--text-light)] gap-2`}
    >
      {title}
      <input
        className="w-full ring-1 px-3 py-3 rounded-md ring-[var(--input-ring)] hover:ring-blue-400 transition-all"
        {...rest}
      />
    </label>
  )
}
