import { Link , useNavigate} from "react-router-dom"
import {useState, useContext} from 'react'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext';



const UserSignup =  () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    const navigate = useNavigate();

    const {user,setUser} = useContext(UserDataContext);

    const submithandler= async (e) =>{
        e.preventDefault();
        const newUser ={
          fullname:{
            firstname,
            lastname
          },
          email,
          password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

        if(response.status==201){
          const data = response.data;
          setUser(data.user);
          localStorage.setItem('token', data.token)
          navigate("/user-login");
        }
      
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
            Create Account
          </button>

        </form>
          <p className="text-center text-base">Already have an account?<Link to='/user-login' className="text-blue-600 "> Login here</Link></p>
      </div>
      <div>
        <Link
        to='/captain-signup'
        className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Sign up as captain
            </Link>
      </div>
    </div>
  )
}

export default UserSignup
