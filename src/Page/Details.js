import * as React from 'react';
import { useParams } from 'react-router-dom';
import {Button} from "@mui/material";
import {auth, logout} from "../Firebase/service";
import {Autocomplete, TextField} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import alcohol_icon from "../Asset/alcohol-icon.png";
import {Link as RouterLink} from "react-router-dom";
import party from "../Asset/party.png"
import StarRate from '../Component/starRate';
import "../Styles/Details.css";
const Details = () => {
  let params = useParams();
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
            <Button id="recent-view-btn" style={{height : "60%", color : '#707070'}}onClick={() => showRecentView()}>최근에 본 목록</Button>
            <span style={{height : "40%", verticalAlign : "center"}}>|</span>
            <Button id="logout-btn" style={{height : "60%", color : '#707070'}}onClick={() => logout()}>로그아웃</Button>
          </div>
        </nav>
        <div className="header-top">
          <div className="container">
            <div className="right-top-container">
              <Autocomplete
                style={{width : "50%", border: "0"}}
                disablePortal
                id="combo-box-demo"
                options={["1", "2", "3", "4"]}
                sx={{ width: 300,
                  ".MuiOutlinedInput-root": {
                      borderRadius: 50,
                      borderColor: "red",
                      borderWidth: 0,
                  }
                }}
                renderInput={(params) => <TextField {...params} label="술을 검색해보세요..." size="small"/>}
              />
              <SearchIcon id="search-icon" style={{fontSize : "2rem"}}/>
            </div>
            <div className="center-top-container">
              <img id="alcohol-icon" src={alcohol_icon} alt="alcohol"/>
              <span id="site-name" style={{fontSize:"1.4rem", color:"black"}}>Snu-Liquor</span>
            </div>
            <div className="left-top-container">
              <RouterLink id="quiz" style={{ borderRadius:"3%"}}component={RouterLink} to="/quiz">술 MBTI 검사하러 가기</RouterLink>
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
      <div className='details'>
        <img className="experience-img" src={party} alt="" />
        <div className='detailRight'>
        <h1>이 술의 이름</h1>
          <div className='detailList'>
              <h6>종류: 증류주</h6>
              <h6>도수: 7</h6>
              <h6>부피: 500ml</h6>
              <h6>가격: 10000원</h6>
              <p className='description'>금이산농원에서 생산하는 '오가피와인'은 가을 색이 깊은 11월에 채취한 오가피 열매에 효모를 넣어 발효, 숙성시켜 만든 몸에 좋은 발효주로 해발 700m의 자연환경에서 재배한 검게 잘 익은 열매만 엄선하여 만든다. [오가피와인 정보] 금이산농원에서 생산하는 '오가피와인'은 가을 색이 깊은 11월에 채취한 오가피 열매에 효모를 넣어 발효, 숙성시켜 만든 몸에 좋은 발효주로 해발 700m의 자연환경에서 재배한 검게 잘 익은 열매만 엄선하여 만든다. 보라빛열매가 예쁜 색을 만들어 주며 오가피 열매의 향이 오크 숙성한 듯 향기를 더해준다. 깊고 강렬한 붉은색을 띄며 묵직한 바디감은 메인 코스 요리와 함께 마시면 좋다. [오가피와인 특징] [ 1. 오가피 열매 특유의 맛을 발효 숙성한 웰빙와인] 금이산농원의 '오가피와인'은 보라빛 오가피열매의 색감이 그대로 와인의 색감으로 표현되었다. 오가피 열매의 향이 오크 숙성한 듯한 향기를 더해주는 와인이다. 금이산농원의 김영기 대표가...</p>
          </div>
          </div>
      </div>
      <div>
        
      </div>
      <div className='starRate'>
        <StarRate/>
        <Button>평가하기</Button>
      </div>
    </div>
  );
};

export default Details;