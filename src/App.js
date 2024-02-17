import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState, createContext } from "react";
import axios from "./axios";
import Ask from "./pages/Ask";
import Answers from "./pages/Answers";





export const AppState = createContext();

function App() {
  const [user, setuser] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setuser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppState.Provider value={{ user, setuser }}>
      <Routes>
      <Route path="/" element={<><Home/></>}/>
        <Route path="/" element={<><Login /></>}/>
        <Route path="login" element={<><Login /></>}/>
        <Route path="/Answers/:questionid" element={<> <Answers /></> }/>
        <Route path="/Ask"  element={ <><Ask /></>}/>
        <Route path="/register" element={<> <Register /></> }/>
      </Routes>
    </AppState.Provider>
  );
}
export default App;


