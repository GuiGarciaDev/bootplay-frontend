import { Link, Navigate } from "react-router-dom"
import CustomBackdrop from "../components/CustomBackdrop"
import Header from "../components/Header"
import { useAuth } from "@/hooks/useAuth"

export default function Landing() {
  const { isAuthenticated } = useAuth()

  return (
    <>
      {isAuthenticated && <Navigate to={"/dashboard"} />}
      <CustomBackdrop>
        <div className="flex w-screen h-screen 2xl:w-[1536px]">
          <Header type="landing" />
          <div className="flex flex-grow px-10 md:px-[100px] font-poppins mt-40 md:mt-0 md:items-center">
            <div className="flex flex-col justify-start items-start text-white gap-[32px] mx-0">
              <h1 className="font-semibold text-2xl md:text-5xl md:max-w-[550px]">
                A história da música não pode ser esquecida!
              </h1>
              <p className="md:text-xl md:max-w-[460px] font-normal">
                Crie já sua conta e curta os sucessos que marcaram os tempos no
                Vinil.
              </p>
              <Link
                to={"/signup"}
                className="flex justify-center items-center py-3 px-10 text-black font-inter font-semibold text-[20px] bg-[var(--sysmap-light)] rounded-md hover:scale-105 hover:bg-[var(--sysmap-light-hover)] transition-all"
              >
                Inscrever-se
              </Link>
            </div>
          </div>
        </div>
      </CustomBackdrop>
    </>
  )
}
