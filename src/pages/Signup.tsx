// import { FormEvent, useState } from "react"
// import Input from "../components/Input"
// import { api } from "../services/apiService"
// import toast from "react-hot-toast"
import { useAuth } from "@/hooks/useAuth"
import form_logo from "../assets/form-logo.svg"

import { AuthForm } from "../components/AuthForm"
import CustomBackdrop from "../components/CustomBackdrop"
import Input from "../components/Input"
import { Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"
import toast from "react-hot-toast"

export default function Signup() {
  // Improvements:
  // - Add react hook form
  // - Remove console logs
  // - Add client formd ata validation (zod)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { isAuthenticated, signup } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    signup(email, password, name)
      .then(() => {
        toast.success("Conta criada com sucesso!")
        setLoading(false)

        setTimeout(() => {
          navigate("/login")
        })
      })
      .catch(() => toast.error("Erro ao criar conta."))
  }

  return (
    <>
      {isAuthenticated && <Navigate to={"/dashboard"} />}
      <CustomBackdrop blur>
        <div className="flex w-screen h-screen 2xl:w-[1536px]">
          {/* header */}
          <div className="flex flex-grow justify-center items-center font-poppins px-4 md:px-0">
            <AuthForm.Root onSubmit={handleSubmit}>
              <AuthForm.Logo src={form_logo} alt="Logo image" />
              <AuthForm.Title>Criar conta</AuthForm.Title>
              <AuthForm.Content>
                <Input
                  title="Nome completo"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  title="Email"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  title="Senha"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </AuthForm.Content>
              <AuthForm.ActionButton type="submit">
                {loading ? "Carregando..." : "Criar conta"}
              </AuthForm.ActionButton>
              <AuthForm.RedirectLabel
                path="/login"
                text="Já tem uma conta?"
                hrefText="Entrar"
              />
            </AuthForm.Root>
          </div>
        </div>
      </CustomBackdrop>
    </>
  )
}
