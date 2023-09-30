import "./App.css";
import AllUsers from "./Pages/AllUsers";
import Login from "./Pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPage from "./Pages/User";
import { Toaster } from "react-hot-toast";
import Protected from "./Pages/Protected";

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Login/>}/>
       <Route path="/all" element={<Protected component={<AllUsers/>}/>}/>
       <Route path="/user/:name" element={<Protected component={<UserPage/>}/>}/>
       
       
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
