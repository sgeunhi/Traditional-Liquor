import {Link as RouterLink, Outlet} from 'react-router-dom';
import {Autocomplete, Button, TextField} from "@mui/material";
import {logout} from "../Firebase/service";
import SearchIcon from "@mui/icons-material/Search";
import alcohol_icon from "../Asset/alcohol-icon.png";
import * as React from "react";
import "../Styles/Home.scss"
import "../Styles/Reset.css";

const Layout = () => {

  const showRecentView = () => {

  }

  return (
    <div>
      <header>
        <nav className="header-nav">
          <div id="header-nav-left">
            <span>Snu-Liquor | 전통주</span>
          </div>
          <div id="header-nav-right">
            <Button id="recent-view-btn" style={{height: "60%", color: '#707070'}} onClick={() => showRecentView()}>최근에
              본 목록</Button>
            <span style={{height: "40%", verticalAlign: "center"}}>|</span>
            <Button id="logout-btn" style={{height: "60%", color: '#707070'}} onClick={() => logout()}>로그아웃</Button>
          </div>
        </nav>
        <div className="header-top">
          <div className="container">
            <div className="right-top-container">
              <Autocomplete
                style={{width: "50%", border: "0"}}
                disablePortal
                id="combo-box-demo"
                options={["1", "2", "3", "4"]}
                sx={{
                  width: 300,
                  ".MuiOutlinedInput-root": {
                    borderRadius: 50,
                    borderColor: "red",
                    borderWidth: 0,
                  }
                }}
                renderInput={(params) => <TextField {...params} label="술을 검색해보세요..." size="small"/>}
              />
              <SearchIcon id="search-icon" style={{fontSize: "2rem"}}/>
            </div>
            <div className="center-top-container">
              <img id="alcohol-icon" src={alcohol_icon} alt="alcohol"/>
              <span id="site-name" style={{fontSize: "1.4rem", color: "black"}}>Snu-Liquor</span>
            </div>
            <div className="left-top-container">
              <RouterLink id="quiz" style={{borderRadius: "3%"}} component={RouterLink} to="/quiz">술 MBTI 검사하러
                가기</RouterLink>
              {/* <Button id="quiz" style={{height : "60%", backgroundColor : "purple", border : "1px solid black", color : 'white'}} onClick={() => showRecentView()}>술 MBTI 검사하기</Button> */}
            </div>
          </div>
          <div className="header-menu">
            <li id="liquor-list">
              <ul>탁주(막걸리)</ul>
              <ul>약주/청주</ul>
              <ul>과실주/와인</ul>
              <ul>증류주</ul>
            </li>
          </div>
        </div>
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  );
};

export default Layout;
