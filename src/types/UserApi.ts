import { Users } from "./User"

export interface AuthResponse {
  email: string
  password: any
  token: string
  id: number
}

export interface CreateResponse {
  email: string
  password: any
  name: string
  id: number
}

export interface GetWalletResponse {
  id: number
  balance: number
  points: number
  lastUpdate: string
  users: Users
}
