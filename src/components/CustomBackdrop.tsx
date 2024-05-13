interface CustomBackdropProps {
  children: React.ReactNode
  blur?: boolean
}

export default function CustomBackdrop({
  children,
  blur,
}: CustomBackdropProps) {
  return (
    <main className="w-screen h-screen bg-custom_bg bg-cover bg-center">
      <div
        className={`relative flex justify-center w-screen h-screen backdrop-brightness-50 ${
          blur ? "backdrop-blur-md" : ""
        } z-50`}
      >
        {children}
      </div>
    </main>
  )
}
