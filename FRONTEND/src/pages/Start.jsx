import { Link } from "react-router-dom";

const Start = () => {
    return (
      <div>
        <div 
          className={`h-screen pt-8 flex justify-between flex-col w-full bg-cover bg-center bg-no-repeat`} 
          style={{ backgroundImage: `url(${import.meta.env.VITE_IMAGE_PATH2})` }} // Use inline style for dynamic URL
        >
          <img className="h-8 w-28 ml-8" src={`$/images/home.jpeg`} alt="Cab" />
          <div className="bg-white py-5 px-5 pb-7">
              <h2 className="text-2xl font-bold">Get Started with Urban Cab</h2>
              <Link to='/user-login' className=" flex items-center justify-center w-full bg-black text-white font-semibold py-3 rounded mt-5">Continue</Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default Start;
  