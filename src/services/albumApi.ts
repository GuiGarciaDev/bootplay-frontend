import axios from "axios"

export const albumApi = axios.create({
  baseURL: "http://localhost:8082/api/albums",
})
