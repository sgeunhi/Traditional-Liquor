import * as React from "react";
import "../Styles/Reset.css";
import "../Styles/Home.css";
import {Link, Link as RouterLink} from "react-router-dom";
import {useRecoilValue, useRecoilState} from "recoil";
import {dummyAlcoholListState} from '../Store/atom';
import {alcoholListState} from "../Store/selector";
function Items({currentItems}) {
  
  // const alcoholList = useRecoilValue(dummyAlcoholListState);
  const alcoholList = useRecoilValue(alcoholListState);
  const onClickItem = (idx, num) => {
    if (localStorage.getItem("liquors")=== null){
      const liquors = [];
      liquors.push = idx;
      localStorage.setItem("liquors", JSON.stringify(liquors));
    } else {
      const liquors = JSON.parse(localStorage.getItem("liquors"));
      liquors.push(idx);
      localStorage.setItem("liquors", JSON.stringify(liquors));
    }
    // window.location.href = `/details/${num}`; 
  }
  const currentPage = document.querySelector('.currentPage');
  const curr_page = currentPage ? currentPage.innerText : 1;
  return (
    <>
      {currentItems.map((alcohol, idx) => {
        return (
          <RouterLink className="liquor-card" to={`/details/${alcoholList[parseInt(curr_page) * 28 - 28 + idx].id}`}>
            <div className="liquor-div" onClick={() => onClickItem(idx, parseInt(curr_page) * 28 - 28 + idx)}>
              <img className="liquor-card-img" referrerPolicy="no-referrer" src={alcohol.imageUrl}/>
              <span style={{fontWeight: "bold"}}>{alcohol.name} | {alcohol.price}원 <br></br></span>
            </div>
          </RouterLink>
        )
      })}
    </>
  );
}

// window.location.href =
export default Items;
