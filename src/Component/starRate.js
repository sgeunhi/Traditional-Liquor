import React,{useState} from "react";
import styled from 'styled-components';

const StarRate=()=>{
    const [hovered,setHovered] =useState(null);
    const [clicked, setClicked]=useState(null);
    const textList = [
        '별로에요',
        '그저 그래요',
        '보통이에요',
        '좋아요',
        '최고예요',
      ];
      const ReviewBox = styled.div`
      padding: 30px;
      color: #999;
      font-size: 20px;
    
      i {
        margin: 20px 10px 20px 0;
        opacity: 0.1;
        cursor: pointer;
        font-size: 50px;
      }
    
      .yellowStar {
        color: orange;
        opacity: 1;
      }
    `;
    const ReviewTextBox = styled.div`
        position: relative;
        text-align: center;
        padding-bottom: 50px;
        `;

const StarContainer = styled.div`
  text-align: center;
  border: none;
  background-color: white;
`;
    const HiddenText = styled.p`
        position: absolute;
        top: 50px;
        left: 50%;
        width: 130px;
        height: 30px;
        padding-top: 7px;
        transform: translate(-50%, -50%);
        color: white;
        background-color: #1f8ce6;
        border-radius: 4px;
        font-size: 16px;

  ${({ show }) => (show ? `display:block` : `display: none`)}
`;
    //백엔드 연결 코드 구현

    return (
        <ReviewBox>
            <ReviewTextBox>
                <p>술을 평가해주세요!</p>
                {[1,2,3,4,5].map(num=>(
                    <HiddenText key={num} show={hovered===num}>
                        {textList[num-1]}
                    </HiddenText>
                ))}
            </ReviewTextBox>
            <StarContainer>
                {[1, 2, 3, 4, 5].map(el => (
                <i
                className={`fas fa-star ${
                (clicked >= el) | (hovered >= el) && 'yellowStar'
                }`}
                key={el}
                id={el}
                onMouseEnter={() => setHovered(el) }
                onMouseLeave={() => setHovered(null)}
                onClick={() => setClicked(el)}
                >★</i>
                ))}
            </StarContainer>
        </ReviewBox>
    )
};
export default StarRate;

