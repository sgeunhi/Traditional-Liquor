import * as React from "react";
import "../Styles/Reset.css";
import "../Styles/Quiz.css";
import KakaoRecommendButton from "./KakaoRecommendButton";
import {Link as RouterLink} from "react-router-dom";
import Typography from "@mui/material/Typography";

const RecommendItems = ({mbtiCharacter, alcohols}) => {

  return (
      <>
          {alcohols.map((alcohol) => {
              return (
                  <div>
                      <RouterLink className="liquor-card" to={`/details/${alcohol.id}`} style={{textDecoration: 'none', color: 'inherit'}} >
                          <img className="liquor-card-img" referrerPolicy="no-referrer" src={alcohol.imageUrl}/>
                          <span style={{fontWeight: "bold"}}>{alcohol.name} | {alcohol.price}원 <br/><br/></span>
                      </RouterLink>
                      <KakaoRecommendButton mbtiCharacter={mbtiCharacter} alcohol={alcohol}/>
                  </div>
              )
          })}
      </>
  );
};

export default RecommendItems;