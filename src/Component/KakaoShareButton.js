import React, {useEffect} from "react";
import {Button} from "@mui/material";

const KakaoShareButton = () => {
  const url = window.location.href;

  const initKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
      }
    }
  }

  useEffect(() => {
    initKakao();
  }, [])

  const shareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: "나에게 맞는 전통술은?",
        description:"간단한 퀴즈를 풀고 전통술을 추천 받아보세요",
        imageUrl:'https://i.postimg.cc/jSzh3tZY/ddddd.png',
        link:{
          mobileWebUrl:url,
          webUrl:url,
        },
      },
      itemContent:{
        profileText: "SNU Traditional Liquor",
        profileImageUrl:"https://i.postimg.cc/DZHJfSnN/alcohol-icon.png",
      },
      social: {
        likeCount: 286,
        commentCount:45,
        sharedCount: 845,
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl:url,
            webUrl:url,
          }
        },
      ]
    })
  }

  return (
    <Button style={{color:"#ffffff", backgroundColor:"#f3dc04"}} onClick={shareKakao}>
      카카오톡 공유하기
    </Button>
  )
}

export default KakaoShareButton;
