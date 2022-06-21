import * as React from "react";
import "../Styles/Reset.css";
import "../Styles/Home.css";
import {Link, Link as RouterLink} from "react-router-dom";
import {useRecoilValue, useRecoilState} from "recoil";
import {filteredAlcoholListState} from "../Store/atom";
function FilteredItems({currentFilteredItems}){
    const filteredAlcoholList = useRecoilValue(filteredAlcoholListState);
    const currentPage = document.querySelector('.currentPage');
    const curr_page = currentPage ? currentPage.innerText : 1;
    return (
      <>
        {currentFilteredItems.map((alcohol, idx) => {
        return (
            <RouterLink className="liquor-card" to={`/details/${filteredAlcoholList[parseInt(curr_page) * 28 - 28 + idx].id}`}>
                <div className="liquor-div">
                    <img className="liquor-card-img" referrerPolicy="no-referrer" src={alcohol.imageUrl}  />
                    <span style={{fontWeight:"bold"}}>{alcohol.name} | {alcohol.price}원 <br></br></span>
                </div>
            </RouterLink>
        )
        })}
        
      </>
    );
}

export default FilteredItems;