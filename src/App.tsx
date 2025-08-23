import AppRoutes from "./router/AppRoutes"
import ScrollToTop from "./shared/components/ScrollToTop/ScrollToTop"
import { AuthProvider } from "./shared/context/auth/AuthContext"
import DefaultLayout from "./shared/layouts/DefaultLayout"

function App() {
  return (
    <AuthProvider>
      <DefaultLayout>
        <ScrollToTop />
        <AppRoutes />
      </DefaultLayout>
    </AuthProvider>
  )
}

export default App
