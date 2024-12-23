import { Link } from "react-router-dom"
import {useState} from 'react'


const CaptainSignup = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [userdata, setUserData] = useState({});

    const submithandler= (e) =>{
        e.preventDefault();
        setUserData({
          fullname:{
            firstname,
            lastname
          },
          email,
          password
        });
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
    }
  
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
      <img className="h-8 mb-10" src={`${import.meta.env.VITE_IMAGE_PATH}`} alt="Cab"/>
        <form onSubmit={(e)=>{
          submithandler(e);
        }}>

          
          <h3 className="text-base font-medium mb-2">Enter your name?</h3>
          <div className="flex gap-4">
            <input
            value={firstname}
            onChange={(e)=>{
              setFirstname(e.target.value);
            }}
              className="bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border text-lg placeholder:text-base"
              required
              type="text"
              placeholder="First name"
            />
            <input
            value={lastname}
            onChange={(e)=>{
              setLastname(e.target.value);
            }}
              className="bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border text-lg placeholder:text-base"
              required
              type="text"
              placeholder="Last name"
            />
          </div>


          <h3 className="text-base font-medium mb-2">Enter your email?</h3>

          <input
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value);
          }}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-base font-medium mb-2">Enter Password</h3>

          <input
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value);
          }}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="password"
          />

          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>

        </form>
          <p className="text-center text-base">Already have an account?<Link to='/captain-login' className="text-blue-600 "> Login here</Link></p>
      </div>
      <div>
        <Link
        to='/user-signup'
        className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Sign up as User
            </Link>
      </div>
    </div>
  )
}

export default CaptainSignup
