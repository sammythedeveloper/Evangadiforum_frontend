import React, { useRef ,useContext,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import MenuIcon from "@mui/icons-material/Menu";
import { AppState } from "../App";
import bg from '../img/bg-svg-f.svg';


function Register() {
  const Navigate = useNavigate();
  const userNameDom = useRef();
  const firstnameDom = useRef();
  const LastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  const { user } = useContext(AppState);
  const [errorMessage, setErrorMessage] = useState("");


  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = userNameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = LastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      setErrorMessage("Please provide all required information");
      return;
    }

    try {
      await axios.post("/api/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      setErrorMessage(""); 
      Navigate("/login");
    } catch (error) {
      setErrorMessage("Something went wrong!");
      console.log(error.response);
    }
  }

  return (
    <div className=" relative "  >
      <div className="absolute inset-0 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${bg})`, zIndex:-1 }}></div>
<div className="  h-20 flex justify-evenly items-center  shadow-xl  bg-white z-10  ">
        <div className="  sm:w-36 flex justify-evenly gap-32 ">
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
      <div className=" w-full pt-20 h-[800px] flex shadow-sm ">
        <div className=" sm:w-[350px] md:w-[500px] lg:w-[400px] xl:w-[400px] h-[400px] ml-48 mt-24 shadow-2xl rounded-md text-center text-xs bg-white  ">
          <p className=" text-center text-lg  font-semibold mt-8 ">
            Join the network
          </p>
          <p className="text-center text-xs  ">
            Already have an account?
            <Link to={"/login"}>
              <a className=" text-orange-500  hover:underline " href="">
                Sign in
              </a>
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
          {errorMessage && (
        <div className="bg-red-200 text-red-700 p-2 mb-4">{errorMessage}</div>
      )}
                <input
                  className="border border-slate-300 sm:w-[150px]  md:w-[270px] lg:w-[300px] xl:w-[300px] h-[40px] mt-3 rounded "
                  ref={userNameDom}
                  type="text"
                  placeholder="Username"
              />
              <input
                className="border border-slate-300 sm:w-[150px]  md:w-[270px] lg:w-[300px] xl:w-[300px] h-[40px] mt-3 rounded "
                ref={firstnameDom}
                type="text"
                placeholder="First name"
              />
              <input
                className=" border border-slate-300 sm:w-[150px]  md:w-[270px] lg:w-[300px] xl:w-[300px] h-[40px] mt-3 rounded  "
                ref={LastNameDom}
                type="text"
                placeholder="Last name"
              />
              <input
                className=" border border-slate-300 sm:w-[150px]  md:w-[270px] lg:w-[300px] xl:w-[300px] h-[40px] mt-3 rounded  "
                ref={emailDom}
                type="email"
                placeholder="Email"
              />
              <input
                className=" border border-slate-300 sm:w-[150px]  md:w-[270px] lg:w-[300px] xl:w-[300px] h-[40px] mt-3 rounded  "
                ref={passwordDom}
                type="password"
                placeholder="Password"
            />
               <button
            className="bg-blue-600 sm:w-[150px]  md:w-[270px] lg:w-[300px] xl:w-[300px] h-[40px] text-center rounded mt-20 text-white hover:bg-orange-500  "
           type="submit"
          >
            Agree and Join
            </button>        
          </form>
          <Link to="/login">
            <p className="text-xs text-orange-500 hover:underline mt-10 ">
              <a href="">Already have an account</a>
            </p>
          </Link>
        </div>
        <div className="w-[450px]  ml-10 mt-24 text-justify text-xs text-gray-500 ">
          <p className="pt-16 text-orange-400 ">About</p>
          <h className=" text-4xl font-medium text-gray-700  ">
            Evangadi Networks
          </h>
          <p className="pb-10 pt-5">
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
            <p className="mt-5 ">
              Wheather you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>
          </p>
          <button className=" w-[150px] h-[30px] bg-orange-500 text-white rounded ">
            HOW IT WORKS
          </button>
        </div>
          </div>
    </div>
  );
}

export default Register;
