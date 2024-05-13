import Header from "@/components/Header"
import search_svg from "@/assets/search.svg"
import { FormEvent, useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { AlbumModel } from "@/types/Album"
import toast from "react-hot-toast"
import AlbumCard from "@/components/AlbumCard"
import AlbumModal from "@/components/AlbumModal"
import Carousel from "@/components/Carousel/Carousel"

export default function Dashboard() {
  const [text, setText] = useState("")
  const [albumsList, setAlbumsList] = useState<AlbumModel[]>([])
  const [trends, setTrends] = useState<AlbumModel[]>([])
  const [toggleTrends, setToggletrends] = useState(true)
  const [loading, setLoading] = useState(false)

  const { getAlbumsByText } = useAuth()

  // Improvements
  // <Suspense/> for loading animations?

  useEffect(() => {
    getTrends() // Get trend albums
  }, [])

  async function getTrends() {
    await getAlbumsByText("rock")
      .then((res) => {
        if (typeof res === "string") {
          toast.error(res)
        } else {
          setTrends(res)
        }
      })
      .catch(() => {
        toast.error("Erro ao carregar albums em alta.")
      })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (text === "") {
      toast.error("Insira um texto para pesquisar.")
      return
    }

    setToggletrends(false)
    setLoading(true)

    await getAlbumsByText(text)
      .then((res) => {
        if (typeof res === "string") {
          toast.error(res)
          setToggletrends(false)
        } else {
          setAlbumsList(res)
        }
      })
      .catch(() => {
        toast.error("Erro ao pegar albums.")
        setToggletrends(false)
      })

    setLoading(false)
  }

  return (
    <div className="relative flex justify-center w-screen h-screen overflow-x-hidden bg-[var(--dashboard-background)]">
      <div className="flex w-screen 2xl:w-[1536px] overflow-auto">
        <Header type="dashboard" />
        <div className="flex flex-col flex-grow bg-[var(--dashboard-background)]">
          <div className="flex w-full h-full max-h-[400px] bg-dashboard_bg bg-cover bg-center bg-no-repeat relative">
            <div className="flex flex-col justify-center flex-grow px-[28px] gap-5 backdrop-brightness-50 text-white">
              <h1 className="font-semibold text-2xl md:text-4xl md:max-w-[480px] mt-20">
                A história da música não pode ser esquecida!
              </h1>
              <p className="text-md md:text-xl">
                Sucessos que marcaram o tempo!!!
              </p>
            </div>
            <div className="absolute w-full h-20 bg-gradient-to-b from-transparent from-10% to-[var(--dashboard-background)] to-70% bottom-0"></div>
          </div>

          <div className="flex flex-col w-full items-center pb-2">
            <form
              className="w-full max-w-[80%] sm:max-w-[400px]"
              onSubmit={handleSubmit}
            >
              <label
                className={`flex text-[16px] w-full text-white gap-2 border border-[var(--search-input-border)] rounded-sm px-4 py-2`}
              >
                <input
                  className="bg-transparent caret-white outline-none w-full"
                  placeholder="Pesquise albums..."
                  onChange={(e) => setText(e.target.value)}
                />
                <button type="submit">
                  <img src={search_svg} alt="search icon" />
                </button>
              </label>
            </form>

            <div className="flex flex-col w-full mt-3">
              {toggleTrends ? (
                <>
                  <h2 className="font-semibold text-3xl text-white ml-10 md:ml-[100px]">
                    Em alta
                  </h2>
                  <Carousel className="mt-3">
                    {trends.map((album, idx) => {
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
                    })}
                    {trends.map((album, idx) => {
                      return (
                        <AlbumModal
                          key={idx}
                          album={album}
                          modalTrigger={
                            <AlbumCard
                              imageUrl={album.images[0].url}
                              name={album.name}
                              value={album.value}
                              key={idx}
                            />
                          }
                        />
                      )
                    })}
                  </Carousel>

                  {/* <div className="flex flex-wrap w-full h-40 text-white mt-3">
                    {trends.map((album, idx) => {
                      return (
                        <AlbumModal
                          key={idx}
                          album={album}
                          modalTrigger={
                            <AlbumCard
                              imageUrl={album.images[0].url}
                              name={album.name}
                              value={album.value}
                              key={idx}
                            />
                          }
                        />
                      )
                    })}
                  </div> */}
                </>
              ) : (
                <div className="flex flex-wrap w-full text-white h-40 justify-center gap-5">
                  {!loading ? (
                    albumsList.map((album, idx) => {
                      return (
                        <AlbumModal
                          key={idx}
                          album={album}
                          modalTrigger={
                            <AlbumCard
                              imageUrl={album.images[0].url}
                              name={album.name}
                              value={album.value}
                              key={idx}
                            />
                          }
                        />
                      )
                    })
                  ) : (
                    <span>Carregando...</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
