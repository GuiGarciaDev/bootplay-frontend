import Header from "@/components/Header"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import toast from "react-hot-toast"
import AlbumCard from "@/components/AlbumCard"
import CollectionCard from "@/components/CollectionCard"
import totalAlbumSvg from "../assets/total-album.svg"
import albumValueSvg from "../assets/album-value.svg"
import leftArrowSvg from "../assets/left-arrow.svg"
import { Link } from "react-router-dom"
import { MyAlbumModel } from "@/types/AlbumApi"

export default function MyCollection() {
  const [myAlbums, setMyAlbums] = useState<MyAlbumModel[]>([])
  const [loading, setLoading] = useState(false)

  const { getMyCollection } = useAuth()

  useEffect(() => {
    handleMyCollection()
  }, [])

  function handleTotalCalculate() {
    let total = 0

    if (myAlbums.length > 0) {
      myAlbums.map((album) => {
        total += album.value
      })
    }

    return total
  }

  async function handleMyCollection() {
    setLoading(true)

    await getMyCollection()
      .then((res) => {
        if (typeof res === "string") {
          toast.error(res)
        } else {
          setMyAlbums(res)
        }
      })
      .catch(() => {
        toast.error("Erro ao carregar coleção.")
      })

    setLoading(false)
  }

  return (
    <div className="relative w-screen h-screen overflow-x-hidden bg-[var(--dashboard-background)]">
      <div className="flex w-screen 2xl:w-[1536px] overflow-auto">
        <Header type="dashboard" />
        <div className="flex flex-col flex-grow bg-[var(--dashboard-background)]">
          <div className="flex flex-col w-full items-center px-10 md:px-[100px] pb-10 py-32">
            <div className="flex flex-col w-full gap-10">
              <Link to={"/dashboard"}>
                <div className="flex gap-3 text-white text-lg">
                  <img src={leftArrowSvg} alt="left arrow" />
                  Voltar para dashboard
                </div>
              </Link>

              <h2 className="font-semibold text-4xl text-white mt-6">
                Meus discos
              </h2>

              <div className="flex gap-6 flex-wrap justify-center md:justify-start">
                <CollectionCard
                  imgUrl={totalAlbumSvg}
                  title="Total de albums"
                  value={`${myAlbums.length}`}
                />
                <CollectionCard
                  imgUrl={albumValueSvg}
                  title="Valor investido"
                  value={`R$ ${handleTotalCalculate().toFixed(2)}`}
                />
              </div>

              <div className="flex flex-wrap w-full text-white justify-center gap-5">
                {!loading ? (
                  myAlbums.map((album, idx) => {
                    return (
                      <AlbumCard
                        imageUrl={album.imageUrl}
                        name={album.name}
                        value={album.value}
                        key={idx}
                      />
                    )
                  })
                ) : (
                  <span>Carregando...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
