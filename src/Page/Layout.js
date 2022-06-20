import {Link as RouterLink, Outlet} from 'react-router-dom';
import {Autocomplete, Button, TextField} from "@mui/material";
import {logout} from "../Firebase/service";
import SearchIcon from "@mui/icons-material/Search";
import alcohol_icon from "../Asset/alcohol-icon.png";
import * as React from "react";
import { useRecoilState, useRecoilValue } from 'recoil';
import {alcoholListState} from "../Store/selector";
import {categoryState, itemOffsetState} from "../Store/atom";
import { useNavigate } from 'react-router-dom';
import "../Styles/Home.scss"
import "../Styles/Reset.css";
// import {dummyAlcoholListState} from '../Store/atom';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';

const Layout = () => {
  const navigate = useNavigate();  
  const alcoholList = useRecoilValue(alcoholListState);
  // const alcoholList = useRecoilValue(dummyAlcoholListState);
  const alcoholNameList = alcoholList.map(e => e['name']);
  const onClickNavigateDetail = () => {
    const box = document.querySelector('#combo-box-demo');
    const idx = alcoholList.findIndex(e => e.name === box.value);
    const id = alcoholList[idx].id;
    if (localStorage.getItem("liquors")=== null){
      const liquors = [];
      liquors.push = idx;
      localStorage.setItem("liquors", JSON.stringify(liquors));
    } else {
      const liquors = JSON.parse(localStorage.getItem("liquors"));
      liquors.push(idx);
      localStorage.setItem("liquors", JSON.stringify(liquors));
    }
    
    navigate(`/details/${id}`);
  }
  alcoholNameList.sort();

  const [itemOffset, setItemOffset] = useRecoilState(itemOffsetState);

  const [category, setCategory] = useRecoilState(categoryState);  



  const handleCategoryClick = (event) => {
    switch (event.target.innerText){
      case("탁주(막걸리)"):
        console.log(1);
        setItemOffset((1* 25) % 500);
        setCategory(1);
        break;
      case("약주/청주"):
        setItemOffset((2* 25) % 500);
        setCategory(6);
        break;
      case("과실주/와인"):
        setItemOffset((3* 25) % 500);
        setCategory(11);
        break;
      case("증류주"):
        setItemOffset((4* 25) % 500);
        setCategory(16);
        break;
      default:
        
        console.log(100);
        break;
    }
  }
  const showRecentView = () => {
    const recentView = document.querySelector('#recent-view');
    recentView.innerText = "hello im"
  }
  
  return (
    <div>
      <header>
        <nav className="header-nav">
          <div id="header-nav-left">
            <span>Snu-Liquor | 전통주</span>
          </div>
          <div id="header-nav-right">
            <Button id="recent-view-btn" style={{height: "60%", color: '#707070'}} onClick={() => showRecentView()}>최근에 본 목록
            </Button>
            {/* <Paper id="recent-view-paper" sx={{ width: 100 }}>
                <MenuList dense>
                  <MenuItem>
                    <ListItemText inset>Single</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemText inset>1.15</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemText inset>Double</ListItemText>
                  </MenuItem>
                </MenuList>
              </Paper> */}
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
                options={alcoholNameList}
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
              
              
                <SearchIcon id="search-icon" style={{fontSize: "2rem"}} onClick={() => onClickNavigateDetail()}/>
              
            </div>
            <div className="center-top-container">
              <img id="alcohol-icon" src={alcohol_icon} alt="alcohol" onClick={() => window.location.href="/home"}/>
              <span id="site-name" style={{fontSize: "1.4rem", color: "black"}}>Snu-Liquor</span>
            </div>
            <div className="left-top-container">
              <RouterLink id="quiz" style={{borderRadius: "3%"}} component={RouterLink} to="/quiz">술 MBTI 검사하러
                가기</RouterLink>
              {/* <Button id="quiz" style={{height : "60%", backgroundColor : "purple", border : "1px solid black", color : 'white'}} onClick={() => showRecentView()}>술 MBTI 검사하기</Button> */}
            </div>
          </div>
          <div className="header-menu">
            <ul id="liquor-list">
              <li onClick={(e)=>handleCategoryClick(e)}>탁주(막걸리)</li>
              <li onClick={(e)=>handleCategoryClick(e)}>약주/청주</li>
              <li onClick={(e)=>handleCategoryClick(e)}>과실주/와인</li>
              <li onClick={(e)=>handleCategoryClick(e)}>증류주</li>
            </ul>
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
