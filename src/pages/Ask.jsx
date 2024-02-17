import React, { useRef, useContext, useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios.js";
import { AppState } from "../App.js";
import MenuIcon from "@mui/icons-material/Menu";

function Ask() {
  const { user } = useContext(AppState);
  const Navigate = useNavigate();
  const titleDom = useRef();
  const descriptionDom = useRef();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const titleValue = titleDom.current.value;
    const descriptionValue = descriptionDom.current.value;
    if (!titleValue || !descriptionValue) {
      setSuccess(false);
      setError("All fields are required");
    }
    try {
      await axios.post("/api/questions/askquestion", {
        title: titleValue,
        description: descriptionValue,
        userid: user.userid,
      });
      setError(null);
      setSuccess(true);
      Navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div>
      <div className="  h-20 flex justify-evenly items-center  shadow-xl  ">
        <div className="  sm:w-36 flex justify-evenly gap-32 ">
          <img
            className=" w-[150px]  "
            src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
            alt=""
          />
          <span className=" hidden sm:block md:hidden lg:hidden xl:hidden hover:text-orange-500 ">
            <MenuIcon />
          </span>
        </div>
        <div className="hidden md:flex gap-4 text-xs items-center   ">
          <Link to="/">
            <div>Home</div>
          </Link>
          <div>How it works</div>
          <Link to={"/login"}>
            <button className="w-[150px] h-[30px]  bg-blue-600 text-white rounded hover:bg-orange-500  ">
              {!user ? "SIGN IN " : "SIGN OUT"}
            </button>
          </Link>
        </div>
      </div>

      <div className=" w-auto flex justify-center m-10 font-extrabold text-lg underline ">
        Steps To Write A Good Questions
      </div>
      <ul className=" ml-10 text-lg  ">
        <li>
          <ArrowRightIcon />
          Summerize your problems in a one-line-title.
        </li>
        <li>
          <ArrowRightIcon />
          Describe your problem in more detail.
        </li>
        <li>
          <ArrowRightIcon />
          Describe what you tried and what you expected to happen.
        </li>
        <li>
          <ArrowRightIcon />
          Review your question and post it here.
        </li>
      </ul>
      <br />
      <br />
      <br />
      <br />
      <div className=" sm:w-[640px] md:w-[768px] lg:w-[1024] xl:w-[1280] 2xl:w-[1536px] ml-10 shadow-lg ">
        <p className=" w-full flex justify-evenly  "> Ask Questions</p>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div>
          <form
            onSubmit={handleSubmit}
            class="px-8 pt-6 pb-8 mb-4 bg-white rounded"
          >
            <input
              className=" block sm:w-[600px] md:w-[700px] lg:w-[1000] xl:w-[1250] 2xl:w-[1500px] h-10 border mb-4 "
              ref={titleDom}
              type="text"
              placeholder="Title"
            />
            <textarea
              className=" flex-1 block sm:w-[600px] md:w-[700px] lg:w-[1000] xl:w-[1250] 2xl:w-[1500px] h-96 border   "
              ref={descriptionDom}
              type="text"
              placeholder="Ask your Question here"
            />
            <button
              className=" block w-[160px]  h-[30px]  bg-blue-600 text-white rounded hover:bg-blue-800 mt-8  "
              type="submit"
            >
              Post Your Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Ask;
