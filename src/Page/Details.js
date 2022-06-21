import * as React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Input, Rating} from "@mui/material";
import {auth, logout} from "../Firebase/service";
import {Autocomplete, TextField} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import alcohol_icon from "../Asset/alcohol-icon.png";
import {Link as RouterLink} from "react-router-dom";
import magnifier from "../Asset/magnifier.png"
import StarRates from '../Component/StarRates';
import "../Styles/Details.css";
import KakaoShareButton from "../Component/KakaoShareButton.js";
import {useState,useRef,useEffect} from "react";
import {useRecoilValue,useRecoilState,useRecoilRefresher_UNSTABLE} from "recoil";
import {alcoholListState, rateListState} from "../Store/selector";
import { dummyAlcoholListState } from '../Store/atom';
import getRate from "../Api/getRate"
import postRate from "../Api/postRate"
import {useAuthState} from "react-firebase-hooks/auth";
import {Rate} from "../Entity/Rate"
import { currentAlcoholIdState ,dummyAlcoholListState} from '../Store/atom';

const Details = () => {
  const [user, loading, error] = useAuthState(auth);
  const alcoholList = useRecoilValue(alcoholListState);
  //const alcoholList = useRecoilValue(dummyAlcoholListState);

    let params = useParams();
  const currentAlcohol = alcoholList.filter(_alcohol => _alcohol.id === params)[0];

  const top = useRef();
  const [starRate,setStarRate]=useState(0);
const [review,setReview]=useState('');
const [currentAlcoholId,setCurrentAlcoholId]=useRecoilState(currentAlcoholIdState);
const [nowTime,setNowtime]=useState('');
const reviewList=useRecoilValue(rateListState);
const reviewListRefresh=useRecoilRefresher_UNSTABLE(rateListState);
useEffect(()=>{
  top.current.focus();
  setCurrentAlcoholId(currentAlcohol.id);
})

const onChange=(e)=>{
    setReview(e.target.value)
  }
  const postReview = async() => {

    setNowtime(new Date().getTime())
    console.log(nowTime);
    console.log(starRate);
    console.log(review);
    postRate(
      new Rate(
        null,
        user.uid,
        currentAlcohol.id,
        starRate,
        review,
        nowTime
      )
    ).then(()=>
      reviewListRefresh()
    )
  }
  return (
    <div ref={top}>
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
              <div className='reviewMain'>
              {reviewList.map((review) => {
                    return (
                          <>
                          <StarRates starNum={review.numberOfStars} />
                          <p className='reviews'> {review.userId} :{review.reviewText} {review.timestamp.toLocalString()}</p>
                          </>
                    )
                })}
              </div>
            </div>
        </div>
      </div>
  );
};

export default Details;
