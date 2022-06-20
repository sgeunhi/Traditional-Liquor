import * as React from "react";
import "../Styles/Reset.css";
import "../Styles/Quiz.css";
import KakaoRecommendButton from "./KakaoRecommendButton";

const RecommendItems = ({mbtiCharacter, alcohols}) => {

  return (
      <>
          {alcohols.map((alcohol, idx) => {
              return (
                  <div className="liquor-card" onClick={() => window.location.href = `./details/${idx}`}>
                      <img className="liquor-card-img" referrerPolicy="no-referrer" src={alcohol.imageUrl}/>
                      <span style={{fontWeight: "bold"}}>{alcohol.name} | {alcohol.price}원 <br/><br/></span>
                      <KakaoRecommendButton mbtiCharacter={mbtiCharacter} alcohol={alcohol}/>
                  </div>
              )
          })}
      </>
  );
};

export default RecommendItems;