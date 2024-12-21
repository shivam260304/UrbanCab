import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import CaptainLogin from './pages/CaptainLogin'
import UserLogin from './pages/UserLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserSignup from './pages/UserSignup'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/user-login" element={<UserLogin/>}/>
        <Route path="/user-signup" element={<UserSignup/>}/>
        <Route path="/captain-login" element={<CaptainLogin/>}/>
        <Route path="/captain-signup" element={<CaptainSignup/>}/>
      </Routes>
      <Routes/>
    </div>
  )
}

export default App
