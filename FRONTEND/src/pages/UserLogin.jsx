import { Link, useNavigate } from "react-router-dom";
import {useState, useContext} from 'react'
import axios from 'axios'
import { UserDataContext } from "../context/UserContext";


const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const {user , setUser} = useContext(UserDataContext);

    const submitter = async (e) =>{
        e.preventDefault();
        const logUser = {
            email,
            password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, logUser)

        if(response.status == 200){
          const data = response.data;
          setUser(data.user);
          localStorage.setItem('token', data.token)
          navigate('/home')
        }

        setEmail('');
        setPassword('');
    }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
      <img className="h-8 mb-10" src={`/images/logon.png`} alt="Cab"/>
        <form onSubmit={(e)=>{
          submitter(e);
        }}>
          <h3 className="text-lg font-medium mb-2">Enter email</h3>

          <input
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          value={email}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
          value={password}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="password"
          />

          <button
          className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>

        </form>
          <p className="text-center">New here?<Link to='/user-signup' className="text-blue-600 "> Create new Account</Link></p>
      </div>
      <div>
        <Link
        to='/captain-login'
        className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Login in as captain
            </Link>
      </div>
    </div>
  );
};

export default UserLogin;
