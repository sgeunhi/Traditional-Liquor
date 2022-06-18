import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Page/Login";
import Home from "./Page/Home";
import Quiz from "./Page/Quiz";
import Register from "./Page/Register";
import Details from "./Page/Details";

function App() {
  const [user, setUser] = useState(null);
  const [nickname, setNickname] = useState('닉네임');

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/details/:id" element={<Details/>}/>
          <Route path="/quiz" element={<Quiz/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
