import React from "react";



const StarRates=(starNum)=>{
    const result=[];
    console.log(starNum)
    for(let i=0;i<starNum.starNum;i++){
        result.push(<div>⭐</div>)
    }
    for(let i=0; i<5-starNum.starNum;i++){
        result.push(<div> ⭐</div>)
    }
    console.log(result)
    return result
}
export default StarRates;

