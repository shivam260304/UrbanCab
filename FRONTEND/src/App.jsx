import { Routes, Route } from "react-router-dom"
import Start from './pages/Start'
import CaptainLogin from './pages/CaptainLogin'
import UserLogin from './pages/UserLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserSignup from './pages/UserSignup'
import Home from "./pages/Home"
import UserProtectWrapper from "./pages/UserProtectWrapper"
import UserLogout from "./pages/UserLogout"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />}/>
        <Route path="/user-login" element={<UserLogin/>}/>
        <Route path="/user-signup" element={<UserSignup/>}/>
        <Route path="/captain-login" element={<CaptainLogin/>}/>
        <Route path="/captain-signup" element={<CaptainSignup/>}/>
        <Route path="/home" element={
          <UserProtectWrapper>
            <Home/>
          </UserProtectWrapper>
        }/>
        <Route path="/user/logout" element={
          <UserProtectWrapper>
            <UserLogout/>
          </UserProtectWrapper>
        }/>
      </Routes>
    </div>
  )
}

export default App
