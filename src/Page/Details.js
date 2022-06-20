import * as React from 'react';
import {useParams} from 'react-router-dom';
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
import {useState,useRef} from "react";
import {useRecoilValue} from "recoil";
import {alcoholListState} from "../Store/selector";
import moment from 'moment';
const Details = () => {
  const alcoholList = useRecoilValue(alcoholListState);
    let params = useParams();
  const currentAlcohol=alcoholList[params.id];
  const showRecentView = () => {

  }


const [starRate,setStarRate]=useState(0);
const [review,setReview]=useState('');
const [nowTime,setNowtime]=useState('');
/*
const Head = useRef();
React.useEffect(()=>{
  Head.current.focus();
},[]);
*/
const onChange=(e)=>{
    setReview(e.target.value)
  }
  const postReview = () => {
    setNowtime(moment().format('YYYYMMDD HH:mm:ss'));
    console.log(nowTime);
    console.log(starRate);
    console.log(review);
  }
  return (
    <div /*ref={Head}*/>
      <div className='details'>
        <div className='detailImage'>
        <img className="alcoholImage" src={currentAlcohol.imageUrl} alt="" />
        </div>
        <div className='detailRight'>
        <h1 className='alcoholName'>{currentAlcohol.name}</h1>
          <div className='detailList'>
              <h6>종류: {currentAlcohol.typeofAlcohol}</h6>
              <h6>도수: {currentAlcohol.alcohol}</h6>
              <h6>부피: {currentAlcohol.volume}</h6>
              <h6>가격: {currentAlcohol.price}</h6>
              <p className='description'>{currentAlcohol.description}</p>
          </div>
          </div>
        </div>

        <KakaoShareButton/>
        <br/>
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
            <div className='reviewList'>
                <h2 className='reviewHeader'>REVIEWS</h2>
            </div>
        </div>
      </div>
  );
};

export default Details;
