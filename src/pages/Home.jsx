import React, { useContext,useEffect,useState } from "react";
import { AppState } from "../App";
import { Link } from 'react-router-dom';
import axios from "../axios";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from "@mui/icons-material/Menu";
import Groups2SharpIcon from '@mui/icons-material/Groups2Sharp';




function Home() {
  const { user } = useContext(AppState);
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);
  async function fetchQuestions() {
    try {
      const response = await axios.get("/api/questions/allquestions");
      setQuestion(response.data.sort((a, b) => b.id - a.id));
 
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
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
          <Link to={"/login"}>
            <button className="w-[150px] h-[30px]  bg-blue-600 text-white rounded hover:bg-orange-500  ">
              {!user ? 'SIGN IN ' : 'SIGN OUT' }
            </button>
          </Link>
        </div>
      </div>
      <p className=" text-3xl font-semibold  m-6  items-center " >Question asked from the community <Groups2SharpIcon />  </p>
      <div className=" w-auto flex justify-between m-10 ">
        <Link to={'/Ask'} >
        <div className="  pb-5 pt-10 flex justify-center   " >
        <p className=" w-[150px] p-3 text-center bg-blue-600  text-white rounded hover:bg-blue-800   " >Ask Question</p>
          </div> 
          </Link>
        <div className=" pb-5 pt-10 flex justify-center    " >
        <p className=" font-bold ">Welcome:{user.username}</p>
        </div>
        </div>
        <div className=" ml-4 " >
        <hr />
        <div className=" p-16 flex flex-col " >
          <p className=" font-bold " ></p>
          {question.map(item => (
            <Link to={`/Answers/${item.questionid}`}  >
              
            <div>
                <div className="flex m-6 " ></div>     
            <h3 className="text-2xl pb-6 font-semibold  ">{item.description}</h3>
                <p className=" flex mt-6 text-lg " ><AccountCircleIcon />Asked By :{item.username}  </p>   
                <hr/>
            </div>
            </Link>
          ))}
          <hr />
      </div>
      </div>
      </div>
  )
}

export default Home;



