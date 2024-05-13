import { AlbumModel } from "@/types/Album"
import AlbumModal from "./AlbumModal"
import AlbumCard from "./AlbumCard"

interface CarouselInfinityEffectProps {
  albums: AlbumModel[]
}

export default function CarouselInfinityEffect({
  albums,
}: CarouselInfinityEffectProps) {
  return albums.map((album, idx) => {
    return (
      <AlbumModal
        key={idx}
        album={album}
        modalTrigger={
          <AlbumCard
            imageUrl={album.images[0].url}
            name={album.name}
            value={album.value}
          />
        }
      />
    )
  })
}
