import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Page/Login";
import Home from "./Page/Home";
import Quiz from "./Page/Quiz";
import Register from "./Page/Register";
import Details from "./Page/Details";
import Layout from "./Page/Layout";
import Liquor from "./Page/Liquor";
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route element={<Layout/>}>
            <Route path="/liquor/:id" element={<Liquor/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/details/:id" element={<Details/>}/>
            <Route path="/quiz" element={<Quiz/>}/>
          </Route>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
