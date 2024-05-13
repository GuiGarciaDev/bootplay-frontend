import ReactDOM from "react-dom/client"
import Signup from "./pages/Signup"
import "./global.css"
import React from "react"
import { Toaster } from "react-hot-toast"
import Login from "./pages/Login"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import MyCollection from "./pages/MyCollection"
import NotFound from "./pages/NotFound"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import PrivateRoute from "./components/PrivateRoute"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-collection" element={<MyCollection />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.Fragment>
)
