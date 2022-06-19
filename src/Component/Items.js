import * as React from "react";
import "../Styles/Reset.css";
import "../Styles/Home.css";

function Items({currentItems}) {
  const onClickLiquor = (e) => {
    console.log(e);
  }
  return (
    <>
      {currentItems.map((alcohol) => {
        return (
          <div className="liquor-card" onClick={onClickLiquor}>
            <img className="liquor-card-img" referrerPolicy="no-referrer" src={alcohol.imageUrl}/>
            <span style={{fontWeight: "bold"}}>{alcohol.name} | {alcohol.price} <br></br></span>
          </div>)
      })}
    </>
  );
}

export default Items;
