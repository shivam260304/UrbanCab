import { Routes, Route } from "react-router-dom"
import Start from './pages/Start'
import CaptainLogin from './pages/CaptainLogin'
import UserLogin from './pages/UserLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserSignup from './pages/UserSignup'
import Home from "./pages/Home"
import UserProtectWrapper from "./pages/UserProtectWrapper"
import UserLogout from "./pages/UserLogout"
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainHome from "./pages/CaptainHome"
import CaptainLogout from "./pages/CaptainLogout"

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
        <Route path="/captain/logout" element={
          <CaptainProtectWrapper>
            <CaptainLogout/>
          </CaptainProtectWrapper>
        }/>
        <Route path="/captain-home" element={
          <CaptainProtectWrapper>
            <CaptainHome/>
          </CaptainProtectWrapper>
        } />
      </Routes>
    </div>
  )
}

export default App
