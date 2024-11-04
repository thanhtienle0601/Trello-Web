import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Board from './pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/auth/Auth'
import AccountVerification from './pages/auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Settings from './pages/Settings/Settings'
import Boards from './pages/Boards'

const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" replace={true} />
  }
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      {/* Redirect route */}
      <Route
        path="/"
        element={
          <Navigate to={'/boards/66fbccd45370a6270fe3467a'} replace={true} />
        }
      />

      <Route element={<ProtectedRoute user={currentUser} />}>
        {/* Board list */}
        <Route path="/boards" element={<Boards />} />

        {/* Board details */}
        <Route path="/boards/:boardId" element={<Board />} />

        {/* User settings */}
        <Route path="/settings/account" element={<Settings />} />
        <Route path="/settings/security" element={<Settings />} />
      </Route>

      {/* Authentication route */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/account/verification" element={<AccountVerification />} />

      {/* 404 not found page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
