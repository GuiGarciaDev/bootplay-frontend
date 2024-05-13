interface TitleProps {
  children: string
}

export default function Title({ children }: TitleProps) {
  return <h1 className="font-semibold text-3xl">{children}</h1>
}
