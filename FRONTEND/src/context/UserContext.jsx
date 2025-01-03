/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react"

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  // Whatever data is received from the backend side, we need to store it here below -->
  const [user, setUser] = useState({
    email: '',
    fullname:{
      firstname: '',
      lastname: ''
    }
  });
  return (
    <div>
      <UserDataContext.Provider value={{user,setUser}}>
      {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext;
