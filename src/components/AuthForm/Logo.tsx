interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export default function Logo({ ...rest }: LogoProps) {
  return <img {...rest} />
}
