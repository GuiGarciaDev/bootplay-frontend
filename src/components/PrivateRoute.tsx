import { useAuth } from "@/hooks/useAuth"
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth()
  const [mount, setMount] = useState(false)

  useEffect(() => {
    setMount(true) // Wait for hydration
  }, [])

  if (mount) {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
  }
}
