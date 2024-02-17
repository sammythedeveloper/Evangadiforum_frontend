import React, { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { AppState } from "../App";
import { Link } from "react-router-dom";

const Nav = () => {
  
  const { user } = useContext(AppState);

  return (
    <div className=" ">
      <div className="  h-20 flex justify-evenly items-center  shadow-xl  ">
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
          <Link to="/" >
            <div>Home</div>
            </Link>
          <div>How it works</div>
          <Link to={"/"}>
            <button className="w-[150px] h-[30px]  bg-blue-600 text-white rounded hover:bg-orange-500  ">
              {!user ? 'sign in ' : 'sign out' }
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
