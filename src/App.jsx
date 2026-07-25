import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Properties from './pages/Properties'
import SignUp from './pages/SignUp'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* ログイン済みユーザーのみアクセス可能なルート */}
      <Route element={<ProtectedRoute />}>
        <Route path="/properties" element={<Properties />} />
      </Route>

      <Route path="/" element={<Navigate to="/properties" replace />} />
      <Route path="*" element={<Navigate to="/properties" replace />} />
    </Routes>
  )
}

export default App
