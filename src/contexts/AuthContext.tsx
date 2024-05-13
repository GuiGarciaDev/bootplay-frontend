import { albumApi } from "@/services/albumApi"
import { userApi } from "@/services/userApi"
import { AlbumModel } from "@/types/Album"
import {
  GetMyCollectionResponse,
  PostSaleAlbumRequest,
  PostSaleAlbumResponse,
} from "@/types/AlbumApi"
import { UserSession } from "@/types/User"
import {
  AuthResponse,
  CreateResponse,
  GetWalletResponse,
} from "@/types/UserApi"
import { createContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

interface AuthContext {
  userSession: UserSession | undefined
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<string | void>
  signup: (
    email: string,
    password: string,
    name: string
  ) => Promise<string | void>
  logout: () => void
  getWallet: () => Promise<string | GetWalletResponse>
  postWalletCredit: (value: number) => Promise<string | void>
  getAlbumsByText: (param: string) => Promise<string | AlbumModel[]>
  getMyCollection: () => Promise<string | GetMyCollectionResponse>
  postSaleAlbum: (body: PostSaleAlbumRequest) => Promise<string | void>
  deleteAlbumById: (id: number) => Promise<string | void>
}

export const AuthContext = createContext({} as AuthContext)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  //const [userData, setUserData] = useState<User>()
  const [userSession, setUserSession] = useState<UserSession>()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const user_session: UserSession = JSON.parse(
      localStorage.getItem("User_Session") || "{}"
    )

    if (user_session.token) {
      setIsAuthenticated(true)
      setUserSession(user_session)
    }
  }, [])

  // Users API functions

  async function login(email: string, password: string) {
    const response = await userApi.post<AuthResponse>("/auth", {
      email,
      password,
    })

    if (response instanceof Error) return response.message

    localStorage.setItem("User_Session", JSON.stringify(response.data))
    setUserSession(response.data)
    setIsAuthenticated(true)

    // userApi.defaults.headers.common.Authorization = `Basic ${response.data.token}`
    // albumApi.defaults.headers.common.Authorization = `Basic ${response.data.token}`
  }

  async function signup(email: string, password: string, name: string) {
    const response = await userApi.post<CreateResponse>("/create", {
      email,
      password,
      name,
    })

    if (response instanceof Error) return response.message
  }

  function logout() {
    localStorage.removeItem("User_Session")
    setUserSession(undefined)
    setIsAuthenticated(false)
    return <Navigate to="/" />
  }

  async function postWalletCredit(value: number) {
    const response = await userApi.post(`/wallet/credit/${value}`, {
      headers: { Authorization: `Basic ${userSession?.token}` },
    })

    if (response instanceof Error) return response.message
  }

  async function getWallet() {
    const response = await userApi.post<GetWalletResponse>(`/wallet`, {
      headers: { Authorization: `Basic ${userSession?.token}` },
    })

    if (response instanceof Error) return response.message

    return response.data
  }

  // Albums API functions

  async function getAlbumsByText(param: string) {
    const response = await albumApi.get<AlbumModel[]>(
      `/all?searchText=${param}`,
      { headers: { Authorization: `Basic ${userSession?.token}` } }
    )

    if (response instanceof Error) return response.message

    return response.data
  }

  async function getMyCollection() {
    const response = await albumApi.get<GetMyCollectionResponse>(
      `/my-collection`,
      {
        headers: { Authorization: `Basic ${userSession?.token}` },
      }
    )

    if (response instanceof Error) return response.message

    return response.data
  }

  async function postSaleAlbum(body: PostSaleAlbumRequest) {
    const response = await albumApi.post<PostSaleAlbumResponse>(`/sale`, body, {
      headers: { Authorization: `Basic ${userSession?.token}` },
    })

    if (response instanceof Error) return response.message
  }

  async function deleteAlbumById(id: number) {
    const response = await albumApi.post<void>(`/remove/${id}`, {
      headers: { Authorization: `Basic ${userSession?.token}` },
    })

    if (response instanceof Error) return response.message
  }

  const value = {
    userSession,
    isAuthenticated,
    login,
    signup,
    logout,
    getWallet,
    postWalletCredit,
    getAlbumsByText,
    getMyCollection,
    postSaleAlbum,
    deleteAlbumById,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
