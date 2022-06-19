import * as React from 'react';
import KakaoShareButton from "../Component/KakaoShareButton";
import {useState} from "react";
import {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../Styles/Quiz.css";
import QuizHeader from "../Component/QuizHeader";
import {where} from "firebase/firestore";
import quizData from "../Asset/quiz-data.json";
import {LinearProgress} from "@mui/material";

const Quiz = () => {
    const quizData = require("../Asset/quiz-data.json");
    const mbtiData = require("../Asset/mbti.json");
    const data = require("../Asset/alcohol.json");

    const {name, imgUrl, price, description} = data.alcohol;
    const [quizNumber, setQuizNumber] = useState(0);
    const [conditionList, setConditionList] = useState([]);
    const [mbti, setMbti] = useState('');

    const convertConditionToWhere = (conditionList) => {
        return conditionList.map(condition => where(...condition.split(" ")));
    }

    useEffect(() => {
        if (quizNumber === 8) {
            convertConditionToWhere(conditionList).forEach(e => console.log(e));
            console.log(mbti);
        }
    }, [quizNumber]);

    const onAnswerSelected = (quizNumber, answer) => {
        if (quizNumber % 2 !== 0) {
            setMbti(mbti + answer.condition);
        } else {
            const _conditionList = conditionList.slice();
            _conditionList.push(answer.condition);

            setConditionList(_conditionList);
        }

        setQuizNumber(quizNumber + 1);
    }

    const questionContainerStyle = {
        height: '70vh',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const resultContainerStyle = {
        height: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const recommendLiquorStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }

    const questionStyle = {
        marginBottom: '20px'
    };

    const answerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const buttonStyle = {
        fontSize: '1rem',
        fontWeight: '800',
        height: '6em',
        width: '24rem',
        margin: '1em'
    };

    const questionCountStyle = {
        marginTop: '1rem',
        fontSize: '1.3rem',
        fontWeight: '800'
    };

    return (
        <div>
            <QuizHeader/>
            <div id="question-container" style={questionContainerStyle}>
                {
                    quizNumber === quizData.length ?
                        <div id="result-container" style={resultContainerStyle}>
                            <Typography variant="h6"
                                        style={questionStyle}>당신은...</Typography>
                            <Typography variant="h5"
                                        style={questionStyle}>{mbtiData[mbti]}</Typography>
                            <Typography variant="h6"
                                        style={questionStyle}>아래의 술들을 추천합니다!</Typography>
                            <div id="recommend-liquor" style={recommendLiquorStyle}>
                                <div className="liquor-card">
                                    <img className="liquor-card-img" src={imgUrl}/>
                                    <span style={{fontWeight: "bold"}}>{name} | {price} <br></br> {description}</span>
                                </div>
                                <div className="liquor-card">
                                    <img className="liquor-card-img" src={imgUrl}/>
                                    <span style={{fontWeight: "bold"}}>{name} | {price} <br></br> {description}</span>
                                </div>
                                <div className="liquor-card">
                                    <img className="liquor-card-img" src={imgUrl}/>
                                    <span style={{fontWeight: "bold"}}>{name} | {price} <br></br> {description}</span>
                                </div>
                            </div>
                        </div> :
                        <div>
                            <div id="question">
                                <Typography variant="h5"
                                            style={questionStyle}>{quizData[quizNumber].question}</Typography>
                            </div>
                            <div id="answer" style={answerStyle}>
                                <Button variant="outlined" color="secondary" size="large" style={buttonStyle}
                                        onClick={() => onAnswerSelected(quizNumber, quizData[quizNumber].answers[0])}>{quizData[quizNumber].answers[0].text}</Button>
                                <Button variant="outlined" color="secondary" size="large" style={buttonStyle}
                                        onClick={() => onAnswerSelected(quizNumber, quizData[quizNumber].answers[1])}>{quizData[quizNumber].answers[1].text}</Button>
                                <LinearProgress style={{width: '24rem'}} variant="determinate" color="secondary"
                                                value={(quizNumber + 1) / quizData.length * 100}/>
                                <Typography
                                    style={questionCountStyle}>{`${quizNumber + 1} / ${quizData.length}`}</Typography>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default Quiz;
