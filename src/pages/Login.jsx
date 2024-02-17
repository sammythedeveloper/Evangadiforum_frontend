import React, { useRef,useContext,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../App";
import axios from "../axios";
import MenuIcon from "@mui/icons-material/Menu";
import bg from '../img/bg-svg-f.svg';



function Login() {
  const Navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  const { user } = useContext(AppState);
  const [errorMessage, setErrorMessage] = useState("");

  

  async function handleSubmit(e) {
      e.preventDefault();
      
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!emailValue || !passValue) {
      setErrorMessage("Please provide all required information");
      return;
    }

    try {
      const { data } = await axios.post("/api/users/login", {
        email: emailValue,
        password: passValue,
      });
        localStorage.setItem('token',data.token)

      setErrorMessage(""); 
      Navigate("/");
      console.log(data);
    } catch (error) {
      setErrorMessage("Something went wrong!");
      console.log(error.response.data);
    }
  }
  return (
    
    <div className=" relative " >
      <div className="absolute inset-0 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${bg})`, zIndex: -1 }}></div>
      
      <div className=" w-full h-20 flex justify-evenly items-center  shadow-xl fixed bg-white z-10 "  >
        <div className=" flex justify-evenly gap-32 ">
          <img className=" w-[150px]  "
            src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
            alt=""
          />
          <span className=" hidden sm:block md:hidden lg:hidden xl:hidden hover:text-orange-500 ">
            <MenuIcon />
          </span>
        </div>
        <div className="hidden md:flex gap-4 text-xs items-center   ">
            <div>Home</div>
          <div>How it works</div>
            <button className="w-[150px] h-[30px]  bg-blue-600 text-white rounded hover:bg-orange-500  ">
              {user ? 'SIGN IN' : 'SIGN OUT' }
            </button>
        </div>
      </div>
      <div className="pt-24  flex " >
        <div className=" sm:w-[350px] md:w-[500px] lg:w-[400px] xl:w-[400px] max-w-7xl h-[400px] ml-48 mt-24 shadow-2xl rounded-md text-center text-xs bg-white  "  >
        <p></p>  
      <p className=" text-center text-lg  font-semibold mt-8 ">
            Login to your account
          </p>
          <p className="text-center text-xs  ">
            Don't have an account?{" "}
            <Link to={'/register'}>
              <a className=" text-orange-500  hover:underline" href="">
                Create a new account
              </a>
            </Link>
          </p>
      <form onSubmit={handleSubmit}>
        <div>
        {errorMessage && (
        <div className="bg-red-200 text-red-700 p-2 mb-4">{errorMessage}</div>
      )}
          <input className=" border border-slate-300 sm:w-[150px]  md:w-[270px] lg:w-[300px] xl:w-[300px] h-[42px] mt-12 rounded "
            ref={emailDom}
                      type="email"
                      placeholder="Email address " />
        </div>
        <br />

        <div>
          <span></span>
          <input className=" border border-slate-300 sm:w-[150px] md:w-[270px] lg:w-[300px] xl:w-[300px] h-[42px] mt-5 rounded  "
            ref={passwordDom}
                      type="password"
                      placeholder="password" />
        </div>
        <button className="bg-blue-600 sm:w-[150px]  md:w-[270px] lg:w-[300px] xl:w-[300px] h-[40px] text-center rounded mt-12 text-white hover:bg-orange-500" type="submit">Login</button>
        </form>
        </div> 
      <div className="  sm:w-[350px] md:w-[500px] lg:w-[400px] xl:w-[400px]  ml-10 mt-24 text-justify text-xs  ">
          <p className="pt-16 text-orange-400 ">About</p>
          <h1 className="text-4xl font-medium text-gray-700 mb-4 ">
            Evangadi Networks
          </h1>

          <p className="pb-20">
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
            <p className="mt-3 ">
              Wheather you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>
            <button className=" w-[150px] h-[30px] mt-3 bg-orange-500 text-white rounded ">
            HOW IT WORKS
          </button>
          </p>
        </div>
      </div>
    </div >
  );
}

export default Login;
