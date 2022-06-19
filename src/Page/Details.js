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
import {useState} from "react";

const Details = () => {
  let params = useParams();
  const showRecentView = () => {

  }

  const [starRate, setStarRate] = useState(0);
  const [review, setReview] = useState('aa');
  const onChange = (e) => {
    setReview(e.target.value)
  }
  const postReview = () => {
    console.log(starRate);
    console.log(review)
  }
  const Header = React.useRef()
  return (
    <div>
      <div className='details'>
        <img className="experience-img" src={party} alt=""/>
        <div className='detailRight'>
          <h1>이 술의 이름</h1>
          <div className='detailList'>
            <h6>종류: 증류주</h6>
            <h6>도수: 7</h6>
            <h6>부피: 500ml</h6>
            <h6>가격: 10000원</h6>
            <p className='description'>금이산농원에서 생산하는 '오가피와인'은 가을 색이 깊은 11월에 채취한 오가피 열매에 효모를 넣어 발효, 숙성시켜 만든 몸에 좋은 발효주로 해발
              700m의 자연환경에서 재배한 검게 잘 익은 열매만 엄선하여 만든다. [오가피와인 정보] 금이산농원에서 생산하는 '오가피와인'은 가을 색이 깊은 11월에 채취한 오가피 열매에 효모를 넣어
              발효, 숙성시켜 만든 몸에 좋은 발효주로 해발 700m의 자연환경에서 재배한 검게 잘 익은 열매만 엄선하여 만든다. 보라빛열매가 예쁜 색을 만들어 주며 오가피 열매의 향이 오크 숙성한 듯
              향기를 더해준다. 깊고 강렬한 붉은색을 띄며 묵직한 바디감은 메인 코스 요리와 함께 마시면 좋다. [오가피와인 특징] [ 1. 오가피 열매 특유의 맛을 발효 숙성한 웰빙와인] 금이산농원의
              '오가피와인'은 보라빛 오가피열매의 색감이 그대로 와인의 색감으로 표현되었다. 오가피 열매의 향이 오크 숙성한 듯한 향기를 더해주는 와인이다. 금이산농원의 김영기 대표가...</p>
          </div>
        </div>
      </div>
      <div className='naverLink' onclick="naverLink()">
        <img src={magnifier} className='magnifier'/>
        <h2 className='naverUrl'>네이버 지식백과로 더 자세히 알아보기</h2>
      </div>
      <div className='rate'>
        <h5 className='rateHead'>이 술을 평가해주세요!</h5>
        <div className='rateDetails'>
          <Rating className='starRate' name="simple-controlled"
                  value={starRate}
                  onChange={(event, newValue) => {
                    setStarRate(newValue);
                  }}/>
          <Input className='reviewInput' onChange={onChange} value={review}/>
          <Button className='rateButton' onClick={postReview}>평가 등록</Button>
        </div>
      </div>
    </div>
  );
};

export default Details;
