import { createContext, useState } from "react"


// eslint-disable-next-line react-refresh/only-export-components
export const userDataContext = createContext();


// eslint-disable-next-line react/prop-types
const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    fullname:{
      firstname: '',
      lastname: ''
    }
  });
  return (
    <div>
      <userDataContext.Provider value={{user,setUser}}>
      {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext;
