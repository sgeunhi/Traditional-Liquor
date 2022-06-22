import * as React from "react";
import "../Styles/Reset.css";
import "../Styles/Home.css";
import {Link as RouterLink} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {currentFilteredAlcoholListState, filteredAlcoholListState} from "../Store/atom";
function FilteredItems({currentFilteredAlcoholList}){
    const filteredAlcoholList = useRecoilValue(filteredAlcoholListState);
    const _currentFilteredAlcoholList = useRecoilValue(currentFilteredAlcoholListState);
    return (
      <>
        {_currentFilteredAlcoholList.map((alcohol, idx) => {

        return (
            <RouterLink className="liquor-card" to={`/details/${alcohol.id}`}>
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
