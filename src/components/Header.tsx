import logo from "../assets/form-logo.svg"
import { Avatar, AvatarImage } from "./ui/avatar"
import avatar from "../assets/avatar.svg"
import { Link, useLocation } from "react-router-dom"

import menu_icon from "../assets/menu-icon.svg"
import log_out from "../assets/log-out.svg"
import profile from "../assets/profile.svg"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"

interface HeaderProps {
  type: "landing" | "dashboard"
}

export default function Header({ type }: HeaderProps) {
  const param = useLocation()

  const { logout } = useAuth()

  return (
    <div className="flex absolute justify-center w-full h-[75px] left-0 bg-[var(--header-background)] z-40">
      <div className="flex flex-grow px-10 md:px-[100px] justify-between max-w-[1536px]">
        <div className="flex items-center gap-x-5 m-0">
          <img src={logo} alt="logo svg" className="h-[48px]" />
          <h1 className="text-white text-lg">BootPlay</h1>
        </div>
        {type === "landing" ? (
          <div className="flex gap-4 items-center">
            <Link
              to={"/login"}
              className="hidden md:flex px-7 py-1 rounded-md bg-[var(--button-background)] text-lg font-semibold text-white hover:bg-[var(--button-background-hover)] transition-all"
            >
              Entrar
            </Link>
            <Link
              to={"/signup"}
              className="hidden md:flex px-7 py-1 justify-center items-center text-black font-semibold text-lg bg-[var(--sysmap-light)] rounded-md hover:bg-[var(--sysmap-light-hover)] transition-all"
            >
              Inscrever-se
            </Link>

            <Sheet>
              <SheetTrigger className="md:hidden">
                <img src={menu_icon} alt="menu icon" />
              </SheetTrigger>
              <SheetContent
                side={"top"}
                className="bg-[var(--header-background)] flex flex-col items-center border-0 text-white"
              >
                <Link
                  to={"/login"}
                  className="px-7 py-1 rounded-md bg-[var(--button-background)] text-lg font-semibold text-white hover:bg-[var(--button-background-hover)] transition-all"
                >
                  Entrar
                </Link>
                <Link
                  to={"/signup"}
                  className="px-7 py-1 justify-center items-center text-black font-semibold text-lg bg-[var(--sysmap-light)] rounded-md hover:bg-[var(--sysmap-light-hover)] transition-all"
                >
                  Inscrever-se
                </Link>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <Link
              to={"/my-collection"}
              className={`hidden text-white ${
                param.pathname.includes("my-collection") && "font-semibold"
              } md:flex`}
            >
              Meus discos
            </Link>
            <span className="hidden text-white md:flex">Carteira</span>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="hidden md:flex w-[50px] h-[50px] cursor-pointer">
                  <AvatarImage src={avatar} sizes="50" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button className="flex gap-2 w-full text-start items-center">
                    <img src={profile} alt="profile svg" className="w-5 h-5" />
                    Perfil
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    className="flex gap-2 w-full text-start items-center"
                    onClick={() => logout()}
                  >
                    <img src={log_out} alt="log-out svg" className="w-5 h-5" />
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet>
              <SheetTrigger className="md:hidden">
                <img src={menu_icon} alt="menu icon" />
              </SheetTrigger>
              <SheetContent
                side={"top"}
                className="bg-[var(--header-background)] flex flex-col items-center border-0 text-white"
              >
                <Link
                  to={"/my-collection"}
                  className={`flex gap-3 text-white ${
                    param.pathname.includes("my-collection") && "font-semibold"
                  } md:flex`}
                >
                  Meus discos
                </Link>
                <button>Carteira</button>

                <button>Perfil</button>

                <button onClick={() => logout()}>Logout</button>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </div>
  )
}
