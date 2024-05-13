// import { FormEvent, useState } from "react"
// import Input from "../components/Input"
// import { api } from "../services/apiService"
// import toast from "react-hot-toast"
import { FormEvent, useState } from "react"
import form_logo from "../assets/form-logo.svg"
import { AuthForm } from "../components/AuthForm"
import CustomBackdrop from "../components/CustomBackdrop"
import Input from "../components/Input"
import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import toast from "react-hot-toast"

export default function Login() {
  // Improvements:
  // - Add react hook form
  // - Remove console logs
  // - Add client formd ata validation (zod)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)

    login(email, password)
      .then(() => {
        toast.success("Login efetuado com sucesso!")
        setLoading(false)

        setTimeout(() => {
          navigate("/dashboard")
        }, 2000)
      })
      .catch(() => {
        toast.error("Erro ao efetuar login")
        setLoading(false)
      })
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
              <AuthForm.Title>Acesse sua conta</AuthForm.Title>
              <AuthForm.Content>
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
              <AuthForm.ActionButton type="submit" disabled={loading}>
                {loading ? "Carregando..." : "Criar conta"}
              </AuthForm.ActionButton>
              <AuthForm.RedirectLabel
                path="/signup"
                text="Ainda não tem uma conta ?"
                hrefText="Inscrever-se"
              />
            </AuthForm.Root>
          </div>
        </div>
      </CustomBackdrop>
    </>
  )
}
