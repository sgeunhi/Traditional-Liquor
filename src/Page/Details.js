import * as React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Input, Rating} from "@mui/material";
import {auth} from "../Firebase/service";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import magnifier from "../Asset/magnifier.png"
import StarRates from '../Component/StarRates';
import "../Styles/Details.css";
import {useState, useRef, useEffect} from "react";
import {useRecoilValue, useRecoilState, useRecoilRefresher_UNSTABLE} from "recoil";
import {alcoholListState, rateListState} from "../Store/selector";
import postRate from "../Api/postRate"
import {useAuthState} from "react-firebase-hooks/auth";
import {Rate} from "../Entity/Rate"
import {currentAlcoholIdState, dummyAlcoholListState} from '../Store/atom';
import KakaoRecommendButton from "../Component/KakaoRecommendButton";

const Details = () => {
  const [user, loading, error] = useAuthState(auth);
  const alcoholList = useRecoilValue(alcoholListState);
  let params = useParams();
  const currentAlcohol = alcoholList.filter(_alcohol => _alcohol.id === params.id)[0];
  const top = useRef();
  const [starRate, setStarRate] = useState(0);
  const [review, setReview] = useState('');
  const [currentAlcoholId, setCurrentAlcoholId] = useRecoilState(currentAlcoholIdState);
  const reviewList = useRecoilValue(rateListState);
  const reviewListRefresh = useRecoilRefresher_UNSTABLE(rateListState);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) navigate("/");
  }, [user, loading]);

  useEffect(() => {
    top.current.focus();
    setCurrentAlcoholId(currentAlcohol.id);
  })

  const onChange = (e) => {
    setReview(e.target.value)
  }
  const postReview = async () => {
    const timeStamp = new Date().getTime();
    postRate(
      new Rate(
        null,
        user.uid,
        user.displayName,
        currentAlcohol.id,
        starRate,
        review,
        timeStamp,
      )
    ).then(() => setReview('')
    ).then(() => {
        reviewListRefresh()
        setStarRate(0);
      }
    )
  }
  return (
    <div ref={top}>
      <div className='details'>
        <div className='detailImage'>
          <img className="alcoholImage" referrerPolicy="no-referrer" src={currentAlcohol.imageUrl} alt=""/>
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
      <div style={{marginBottom: 20}}>
        <KakaoRecommendButton description={currentAlcohol.description} buttonTitle={'더 알아보기'}
                              alcohol={currentAlcohol}/></div>
      <br/>
      <a className='naverLink' href={currentAlcohol.detailUrl} target="_blank">
        <img src={magnifier} className='magnifier'/>
        <h2 className='naverUrl'>네이버 지식백과로 더 자세히 알아보기</h2>
      </a>
      <div className='rate'>
        <h5 className='rateHead'>이 술을 평가해주세요!</h5>
        <div className='rateDetails'>
          <Rating className="rateStar" name="size-medium" defaultValue={0} size="small" value={starRate}
                  onChange={(event, newValue) => {
                    setStarRate(newValue);
                  }}/>
          <Input className='reviewInput' onChange={onChange} value={review}/>
          <Button className='rateButton' onClick={postReview}>리뷰 남기기</Button>
        </div>
        <div className='reviewList'>
          <h2 className='reviewHeader'>리뷰 목록</h2>
          <div className='reviewMain'>
            {reviewList.map((review) => {
              return (
                <>
                  <div className='reviewBox'>
                    <StarRates starNum={review.numberOfStars}/>
                    <Typography component="div" sx={{width: '100%'}}>
                      <Typography component="div" sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: '100%',
                      }}>
                        <Typography component="div" sx={{
                          display: "flex",
                          flexDirection: "row",
                          width: '100%',
                          alignItems: 'center',
                        }}>
                          <Box sx={{fontWeight: 500, m: 1}}>{review.userName}</Box>
                          <Box sx={{
                            fontWeight: 'medium',
                            padding: '8px',
                            backgroundColor: '#b672ff',
                            color: "#ffffff",
                            borderRadius: '5px',
                            m: 1,
                          }}>
                            {review.reviewText}</Box>
                          <Typography component="div" sx={{
                            display: "flex",
                          }}> <Box sx={{
                            fontSize: "small",
                            fontWeight: 'light',
                            textAlign: 'right',
                            ml: 1
                          }}>{new Date(review.timestamp).toLocaleString()}</Box>
                          </Typography>
                        </Typography>
                      </Typography>
                    </Typography>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
    ;
};

export default Details;
