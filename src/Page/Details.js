import * as React from 'react';
import { useParams } from 'react-router-dom';
import {Button, Input, Rating} from "@mui/material";
import {auth, logout} from "../Firebase/service";
import {Autocomplete, TextField} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import alcohol_icon from "../Asset/alcohol-icon.png";
import {Link as RouterLink} from "react-router-dom";
import party from "../Asset/party.png"
import magnifier from "../Asset/magnifier.png"
import StarRate from '../Component/starRate';
import "../Styles/Details.css";
import KakaoShareButton from "../Component/KakaoShareButton.js";
import {useState} from "react";
import {useRecoilValue} from "recoil";
import {alcoholListState} from "../Store/selector";
const Details = () => {
  const alcoholList = useRecoilValue(alcoholListState);
  const currentAlcohol=alcoholList[0];
  let params = useParams();
  const showRecentView = () => {

  }

const [starRate,setStarRate]=useState(0);
const [review,setReview]=useState('');
const onChange=(e)=>{
    setReview(e.target.value)
}
const postReview=()=>{
    console.log(starRate);
    console.log(review)
    }
const Header=React.useRef()
  return (
    <div>
      <header ref={Header}>
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
        <div className='detailImage'>
        <img className="alcoholImage" src={currentAlcohol.imageUrl} alt="" />
        </div>
        <div className='detailRight'>
        <h1>{currentAlcohol.name}</h1>
          <div className='detailList'>
              <h6>종류: {currentAlcohol.typeofAlcohol}</h6>
              <h6>도수: {currentAlcohol.alcohol}</h6>
              <h6>부피: {currentAlcohol.volume}</h6>
              <h6>가격: {currentAlcohol.price}</h6>
              <p className='description'>{currentAlcohol.description}</p>
          </div>
          </div>
      </div>
      <a className='naverLink' href={currentAlcohol.detailUrl} target="_blank">
        <img src={magnifier} className='magnifier'/>
        <h2 className='naverUrl'>네이버 지식백과로 더 자세히 알아보기</h2>
      </a>
        <div className='rate'>
            <h5 className='rateHead'>이 술을 평가해주세요!</h5>
            <div className='rateDetails'>
                <Rating className='starRate' name="simple-controlled"
                        value={starRate}
                        onChange={(event, newValue) => {
                            setStarRate(newValue);
                        }}/>
                <Input className='reviewInput' onChange={onChange} value={review} />
                <Button className='rateButton' onClick={postReview}>평가 등록</Button>
            </div>
        </div>
    </div>
  );
};

export default Details;
