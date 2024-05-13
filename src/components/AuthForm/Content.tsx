import { ReactNode } from "react"

interface ContentProps {
  children: ReactNode
}

export default function Content({ children }: ContentProps) {
  return <div className="flex flex-col w-full gap-5">{children}</div>
}
