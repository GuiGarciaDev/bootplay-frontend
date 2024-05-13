import { Link } from "react-router-dom"

interface RedirectLabelProps {
  path: string
  text: string
  hrefText: string
}

export default function RedirectLabel({
  path,
  text,
  hrefText,
}: RedirectLabelProps) {
  return (
    <span className="text-[var(--text-light) text-center">
      {`${text} `}
      <Link
        to={path}
        className="text-[var(--text-bold)] font-semibold underline"
      >
        {hrefText}
      </Link>
    </span>
  )
}
