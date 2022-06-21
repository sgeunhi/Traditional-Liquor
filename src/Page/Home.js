import * as React from 'react';
import {Button} from "@mui/material";
import {Autocomplete, TextField} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import {auth, logout} from "../Firebase/service";
import {useEffect, useState} from "react";
import {Link, Link as RouterLink} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";

import alcohol_icon from "../Asset/alcohol-icon.png";
import liquor_1 from "../Asset/liquor-1.png";
import liquor_2 from "../Asset/liquor-2.png";
import liquor_3 from "../Asset/liquor-3.png";
import liquor_4 from "../Asset/liquor-4.png";
import gift from "../Asset/gift.png";
import party from "../Asset/party.png";
import dinner from "../Asset/dinner.png";
import newspaper from "../Asset/newspaper.png";
import ricewine from "../Asset/ricewine.png"
import newsThumbnail_1 from "../Asset/news-thumbnail-1.jpeg";
import newsThumbnail_2 from "../Asset/news-thumbnail-2.jpeg";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Autoplay} from 'swiper'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';

import "../Styles/Reset.css";
import "../Styles/Home.scss";
import {useRecoilValue, useRecoilState} from "recoil";
import {alcoholListState} from "../Store/selector";
import PaginatedItems from "../Component/PaginatedItems";
import { categoryState } from '../Store/atom';
import {dummyAlcoholListState} from '../Store/atom';

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) navigate("/");
  }, [user, loading]);

  const data = require("../Asset/alcohol.json");
  const {name, imgUrl, price, description} = data.alcohol;
  const alcoholList = useRecoilValue(alcoholListState);
  // const alcoholList = useRecoilValue(dummyAlcoholListState);
  const randomHot = [];
  while(randomHot.length < 4){
    const rand = Math.floor(Math.random() * 100);
    if (randomHot.indexOf(rand) === -1){
      randomHot.push(rand);
    }
  }
  const [category, setCategory] = useRecoilState(categoryState);
  useEffect(()=> {
    if (category !== 0){
      const liquors = document.querySelector('#liquor-card-wrapper-text');
      liquors.scrollIntoView();
    }
    // const liquors = document.querySelector('#liquor-card-wrapper-text');
    // liquors.scrollIntoView();

    console.log("category changing recognized");
  }, [category]);
  return (
    <div style={{height: "100vh"}}>
      <div id="liquor-swiper">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          observer={true}
          observeParents={true}
          parallax={true}
          autoplay={true}
          id="swiper"
          slidesPerView={1}
          // onSlideChange={() => console.log('slide change')}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          <div id="swiper-wrapper">
            <SwiperSlide>
              <img className="liquor" id="liquor-1" src={liquor_1} alt=""/>
              <span id="liquor-1-text">

                해물파전에 막걸리 한 잔 어때요?<br></br>
                술 MBTI로 막걸리와의 궁합을 알아보세요<br></br>
                <RouterLink id="liquor-1-quiz" style={{borderRadius: "5%"}} component={RouterLink} to="/quiz">술 MBTI 검사하러 가기</RouterLink>
              </span>
            </SwiperSlide>
            <SwiperSlide>
              <img className="liquor" id="liquor-2" src={liquor_2} alt=""/>
              <span id="liquor-2-text">
                맑은 시냇물을 연상시키는 청주<br></br>
                술 MBTI로 '나의 청주' 찾기
                <RouterLink id="liquor-2-quiz" style={{borderRadius: "3%"}} component={RouterLink} to="/quiz">술 MBTI 검사하러 가기</RouterLink>
              </span>
            </SwiperSlide>
            <SwiperSlide>
              <img className="liquor" id="liquor-3" src={liquor_3} alt=""/>
              <span id="liquor-3-text">
                정갈하지만 강력한 증류주<br></br>
                나만의 증류주 찾기
                <RouterLink id="liquor-3-quiz" style={{borderRadius: "3%"}} component={RouterLink} to="/quiz">술 MBTI 검사하러 가기</RouterLink>
              </span>
            </SwiperSlide>
            <SwiperSlide>
              <img className="liquor" id="liquor-4" src={liquor_4} alt=""/>
              <span id="liquor-4-text">
                우리 포도로 만들어진 더 맛있는 와인<br></br>
                술 MBTI로 나만의 와인 찾기
                <RouterLink id="liquor-4-quiz" style={{borderRadius: "3%"}} component={RouterLink} to="/quiz">술 MBTI 검사하러 가기</RouterLink>
              </span>
            </SwiperSlide>
          </div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
          {/* <div className="swiper-pagination"></div> */}

        </Swiper>
      </div>

      <div className="experience-container">
        <div className="experiences" id="experience-1">
          <img className="experience-img" src={dinner} alt=""/>
          <span style={{fontSize: "85%"}}>당신의 근사한 저녁을 책임질 주인공<br></br>전통주를 초대해보세요.</span>
        </div>
        <div className="experiences" id="experience-2">
          <img className="experience-img" src={gift} alt=""/>
          <span>항상 소중한 사람<br></br>전통주 선물로 마음을 표현하세요.</span>
        </div>
        <div className="experiences" id="experience-3">
          <img className="experience-img" src={party} alt=""/>
          <span>파티에 빠지면 서운한 세글자<br></br>전.통.주</span>
        </div>
      </div>
      <div className="popular-section">
        <img id="popular-alcohol-icon" src={alcohol_icon} alt="alcohol"/>
        <h1 style={{fontSize: "200%"}}>현재 <span style={{color: "#bb17ff"}}>HOT</span>한 주류</h1>
        <div className="popular-wrapper">
          {/* <div className="popular"> */}

          {randomHot.map(rand =>
            <RouterLink className="popular" component={RouterLink} to={`/details/${alcoholList[rand].id}`}>
            <img className="popular-img" referrerPolicy="no-referrer" src={alcoholList[rand].imageUrl}/>
            <span className="popular-text">{alcoholList[rand].name} | {alcoholList[rand].price}원 </span>
          </RouterLink>
            )}
        </div>
      </div>
      <div className="latest-news">
        <img id="newspaper-img" src={newspaper} alt=""/>
        <h1 style={{fontSize: "200%"}}><span style={{fontWeight: "bold"}}>뉴스</span>에 소개된 우리의 <span
          style={{fontWeight: "bold"}}>전통주</span></h1>
        <div className="news-wrapper">
          <div className="news">
            <img src={newsThumbnail_1}
                 onClick={() => window.open("https://bravo.etoday.co.kr/view/atc_view.php?varAtcId=13615")}
                 className="news-image"/>
            <span><a
              href="https://bravo.etoday.co.kr/view/atc_view.php?varAtcId=13615">[카드뉴스] 문헌 밖으로 나온 ‘전설의 전통주’</a></span>
          </div>
          <div className="news">
            <img src={newsThumbnail_2}
                 onClick={() => window.open("https://biz.chosun.com/distribution/channel/2022/05/24/NKCSKQ7HEFEJZCD2JKGEHCUNE4/?utm_source=naver&utm_medium=original&utm_campaign=biz")}
                 className="news-image"/>
            <span><a
              href="https://biz.chosun.com/distribution/channel/2022/05/24/NKCSKQ7HEFEJZCD2JKGEHCUNE4/?utm_source=naver&utm_medium=original&utm_campaign=biz">세븐일레븐 ‘토끼소주’ 판매...편의점 고급소주 경쟁 본격화</a></span>
          </div>

        </div>
      </div>

      <img id="ricewine-icon" src={ricewine} alt="alcohol"/>
      <h1 style={{fontSize: "200%"}} id="liquor-card-wrapper-text"><span style={{fontWeight: "bold"}}>전통주</span> 둘러보기
      </h1>
      <PaginatedItems itemsPerPage={28}/>
    </div>
  );
};

export default Home;
