import { Link } from "react-router-dom";
import {useState} from 'react'

const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // For sending email and password data to next route -->
    const [captaindata, setCaptaindata] = useState({});

    const submitter = (e) =>{
        e.preventDefault();
        setCaptaindata({
            email : email,
            password : password
        })
        console.log(captaindata);
        setEmail('');
        setPassword('');
    }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
      <img className="h-8 mb-10" src={`${import.meta.env.VITE_IMAGE_PATH}`} alt="Cab"/>
        <form onSubmit={(e)=>{
          submitter(e);
        }}>
          <h3 className="text-lg font-medium mb-2">Enter email</h3>

          <input
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="password"
          />

          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>

        </form>
          <p className="text-center">Join Urban Cab?<Link to='/captain-signup' className="text-blue-600 "> Register as a Captain</Link></p>
      </div>
      <div>
        <Link
        to='/user-login'
        className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Login in as user
            </Link>
      </div>
    </div>
  )
}

export default CaptainLogin
