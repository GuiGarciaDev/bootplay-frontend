import axios from "axios"

export const userApi = axios.create({
  baseURL: "http://localhost:8081/api/users",
})
