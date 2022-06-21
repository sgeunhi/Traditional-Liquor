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
import {dummyAlcoholListState} from '../Store/atom';
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

    if (idx===-1){
      alert("Invalid liquor");
      return;
    } else {
      const id = alcoholList[idx].id;
      navigate(`/details/${id}`);
    }
  }
  alcoholNameList.sort();

  const [itemOffset, setItemOffset] = useRecoilState(itemOffsetState);

  const [category, setCategory] = useRecoilState(categoryState);



  const handleCategoryClick = (event) => {
    switch (event.target.innerText){
      case("탁주(막걸리)"):
        navigate("/liquor/1");
        break;
      case("약주/청주"):
        navigate("/liquor/2");

        break;
      case("과실주/와인"):
        navigate("/liquor/3");
        break;
      case("증류주"):
        navigate("/liquor/4");
        break;
      default:
        break;

    }


  }
  const showRecentView = () => {
    const recentView = document.querySelector('#recent-view');
    recentView.innerText = "hello im"
  }
  const onClickNavigateHome = () => {
    console.log('hello')
    navigate("/home");
  }
  return (
    <div>
      <header>
        <nav className="header-nav">
          <div id="header-nav-left">
            <span>Snu-Liquor | 전통주</span>
          </div>
          <div id="header-nav-right">
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
              <img id="alcohol-icon" src={alcohol_icon} alt="alcohol" onClick={() => onClickNavigateHome()}/>
              <span id="site-name" style={{fontSize: "1.4rem", color: "black"}}>Snu-Liquor</span>
            </div>
            <div className="left-top-container">
              <RouterLink id="quiz" style={{borderRadius: "3%"}} component={RouterLink} to="/quiz">술 MBTI 검사하러
                가기</RouterLink>
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
