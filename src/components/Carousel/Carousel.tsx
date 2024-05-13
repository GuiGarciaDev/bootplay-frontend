import "./styles.css"

interface CarouselProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode[]
}

// 250w 100h
// TODO: Finish carousel style

export default function Carousel({ children, ...rest }: CarouselProps) {
  return (
    <div {...rest}>
      <div className="slider">
        <div className="slide-track">{children}</div>
      </div>
    </div>
  )
}
