import { Routes, Route, Navigate } from 'react-router-dom'
import Board from './pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/auth/Auth'

function App() {
  return (
    <Routes>
      {/* Redirect route */}
      <Route
        path="/"
        element={
          <Navigate to={'/boards/66fbccd45370a6270fe3467a'} replace={true} />
        }
      />

      {/* Board details */}
      <Route path="/boards/:boardId" element={<Board />} />

      {/* Authentication route */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />

      {/* 404 not found page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
