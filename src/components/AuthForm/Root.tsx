import { ReactNode } from "react"

interface RootProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

export default function Root({ children, ...rest }: RootProps) {
  return (
    <form
      {...rest}
      className="flex flex-col w-full max-w-[500px] items-center rounded-md bg-[var(--authform-background)] pt-[40px] pb-7 px-10 gap-[15px] font-poppins"
    >
      {children}
    </form>
  )
}
