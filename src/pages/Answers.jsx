import React, { useRef, useContext, useState,useEffect } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import axios from "../axios.js";
import { AppState } from "../App.js";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Groups2SharpIcon from '@mui/icons-material/Groups2Sharp';


function Answers(){
  const { user } = useContext(AppState);
  const navigate = useNavigate();
  const answerRef = useRef();
  const { questionid } = useParams();
  const [answer, setAnswer] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const answervalue = answerRef.current.value;
    console.log("answervalue:", answervalue);
    console.log("user:", user);
    if (!answervalue || !user) {
      setIsSubmitting(false);
      setErrorMsg("Please fill out the answer field.");
      return;
    }

    try {
      console.log("Submitting answer...");
     const response = await axios.post("/api/answers/answerquestion", {
        answer: answervalue,
        questionid: questionid,
        userid: user.userid,
      });

    // Get the submitted answer from the response
    const submittedAnswer = response.data;

    // Update the local state with the new answer
    setCurrentAnswer([...currentAnswer, submittedAnswer]);
  
   // Set isSubmitting to false when the submission is successful
      setIsSubmitting(false);
      console.log("Answer submitted successfully");
      navigate("");
    } catch (error) {
      // Handle errors if needed
      console.error("Submission error:", error);
      // Set isSubmitting to false when the submission fails
      setIsSubmitting(false);
    } 
  };


  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchAnswers() {
      try {
        const response = await axios.get(`/api/answers/answe/${questionid}`);
        console.log(response.data); // Log the response
        setAnswers(response.data);
      } catch (error) {
        console.log(error);
        // alert("something went wrong!");
      }
    }
    fetchAnswers();
  }, [questionid]);

  console.log(answers);

  // To Fetch previously posted answers for a specific question from the server

  const [currentAnswer, setCurrentAnswer] = useState([]);

  useEffect(() => {

    const foundAnswer = answers.filter(
      (answer) => answer.questionid === questionid
    );

    // Check if foundAnsweris defined before updating state
    if (foundAnswer) {
      setCurrentAnswer(foundAnswer);
      console.log(currentAnswer);
    } else {
      const initialCurrentAnswer =
        JSON.parse(localStorage.getItem("currentAnswer")) || {};
      setCurrentAnswer(initialCurrentAnswer);
    }
  }, [questionid, answers]);

  return (
    <div>
      <div className="  h-20 flex justify-evenly items-center  shadow-xl  ">
        <div className="  sm:w-46 flex justify-evenly gap-32 ">
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
      <div className="text-center md:text-left mb-8 md:ml-8">
        <h1 className="text-4xl font-bold mb-4">Answers  </h1>
        <p className="text-2xl mb-4">Answers from the community <Groups2SharpIcon/></p>
      </div>
      <div className="prev_answers overflow-auto"> 
        {currentAnswer.map((answer) => (
         <div className="flex items-center justify-center text-decoration-none border-b border-gainsboro m-25">
         <div className="md:w-1/6">
           
              <p className="mt-3 text-2xl ">
                <AccountCircleIcon /> {answer.username}</p>
         </div>
         <div className="md:w-8/12">
           <p>{answer.answer}</p>
         </div>
        
       </div>
        ))}
      </div>

      <div className=" w-auto flex justify-center m-10 font-extrabold text-lg underline ">
        Give Your answer below
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className=" sm:w-[640px] md:w-[768px] lg:w-[1024] xl:w-[1280] 2xl:w-[1536px] ml-10 shadow-lg ">
        {errorMsg && <div className="bg-red-200 text-red-800 p-2 rounded-md mb-4">{errorMsg}</div>}
        <div>
          <form
            onSubmit={handleSubmit}
            className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
          >
            <textarea
              onChange={(e) => setAnswer(e.target.value)}
              className=" flex-1 block sm:w-[600px] md:w-[700px] lg:w-[1000] xl:w-[1250] 2xl:w-[1500px] h-96 border   "
              type="text"
              placeholder="Enter your Answer"
              ref={answerRef}
            />
            <button
              type="submit"
              className={`bg-blue-500 text-white py-2 px-4 rounded-md ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              } transition duration-800`}
              disabled={isSubmitting}
              onClick={handleSubmit}
              >
              {isSubmitting ? "Submitted..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Answers;
