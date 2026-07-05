import Signup from "./components/Signup"
import Home from "./components/Home"
import {BrowserRouter, Routes , Route} from "react-router-dom"
import Login from "./components/Login"
import UserDashboard from "./components/UserDashboard"
import UserProfile from "./components/UserProfile"

const App=()=>{
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/UserDashboard" element={<UserDashboard/>}/>
      <Route path="/profile" element={<UserProfile/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}
export default App