import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Page/Login";
import Home from "./Page/Home";
import Quiz from "./Page/Quiz";
import Register from "./Page/Register";
import Details from "./Page/Details";

function App() {

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
