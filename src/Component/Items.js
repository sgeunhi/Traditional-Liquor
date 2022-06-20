import * as React from "react";
import "../Styles/Reset.css";
import "../Styles/Home.css";

function Items({currentItems}) {
  // const onClickLiquor = (e) => {
  //   window.location.href = './details/0';
  // }
  const currentPage = document.querySelector('.currentPage');
  const curr_page = currentPage ? currentPage.innerText : 0;
  return (
    <>
      {currentItems.map((alcohol, idx) => {
        return (
          <div className="liquor-card" onClick={() => window.location.href = `./details/${parseInt(curr_page) * 28 - 28 + idx}`}>
            <img className="liquor-card-img" referrerPolicy="no-referrer" src={alcohol.imageUrl}/>
            <span style={{fontWeight: "bold"}}>{alcohol.name} | {alcohol.price}원 <br></br></span>
          </div>)
      })}
    </>
  );
}

export default Items;
