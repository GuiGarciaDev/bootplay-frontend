import { AlbumModel } from "@/types/Album"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@/hooks/useAuth"
import toast from "react-hot-toast"
import { useState } from "react"

interface AlbumModalProps {
  album: AlbumModel
  modalTrigger: React.ReactNode
}

export default function AlbumModal({ album, modalTrigger }: AlbumModalProps) {
  const { postSaleAlbum } = useAuth()
  const [loading, setLoading] = useState(false)

  async function handleBuyAlbum() {
    setLoading(true)

    await postSaleAlbum({
      name: album.name,
      idSpotify: album.id,
      artistName: album.artists[0].name,
      imageUrl: album.images[0].url,
      value: album.value,
    })
      .then((res) => {
        toast.success("Album comprado com sucesso!")
        if (typeof res === "string") toast.error(res)
      })
      .catch(() => {
        toast.error("Erro ao comprar album.")
      })

    setLoading(false)
  }

  return (
    <Dialog>
      <DialogTrigger>{modalTrigger}</DialogTrigger>
      <DialogContent className="flex max-w-[625px] max-h-80 p-0">
        <img
          src={album.images[0].url}
          alt="Album image"
          className="hidden md:flex w-72 h-auto rounded-l-lg"
        />

        <div className="flex flex-col items-center w-full p-6 gap-4">
          <DialogTitle className="font-semibold text-3xl max-h-28 text-ellipsis overflow-hidden">
            {album.name}
          </DialogTitle>
          <div className="flex justify-start flex-col flex-grow text-start w-full overflow-auto overflow-x-hidden text-sm">
            <div>
              <span className="font-semibold">Id: </span>
              <span>{album.id}</span>
            </div>

            <div>
              <span className="font-semibold">Categoria: </span>
              <span>{album.albumType}</span>
            </div>

            <div>
              <span className="font-semibold">Artistas:</span>
              <ul>
                {album.artists.map((artist, idx) => {
                  return (
                    <li className="ml-4" key={idx}>
                      {`${artist.name} - ${artist.type}`}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div>
              <span className="font-semibold">Data de lançamento: </span>
              <span>{album.releaseDate}</span>
            </div>

            <div>
              <span className="font-semibold">Valor: R$ </span>
              <span>{album.value}</span>
            </div>
          </div>
          <button
            className="align-end bg-[var(--buy-album-color)] flex justify-center items-center py-3 w-full text-white font-inter font-medium text-xl rounded-md hover:bg-[var(--sysmap-light-hover)] transition-all"
            onClick={() => handleBuyAlbum()}
          >
            {loading ? "Carregando..." : "Comprar"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
