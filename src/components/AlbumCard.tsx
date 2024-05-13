interface AlbumCardProps {
  imageUrl: string
  name: string
  value: number
}

export default function AlbumCard({ imageUrl, name, value }: AlbumCardProps) {
  return (
    <div
      style={
        {
          "--bg-image": `url(${imageUrl})`,
        } as React.CSSProperties
      }
      className="relative bg-[image:var(--bg-image)] bg-cover bg-no-repeat w-60 h-[245px] rounded-md overflow-hidden"
    >
      <div
        // onClick={() => _navegate(album.externalUrls)}
        className="flex h-full justify-center items-center backdrop-brightness-50 p-6 cursor-pointer"
      >
        <h1 className="text-2xl font-semibold text-center text-white uppercase">
          {name}
        </h1>

        <p className="absolute bottom-3 right-3">{`R$ ${value.toFixed(2)}`}</p>
      </div>
    </div>
  )
}
