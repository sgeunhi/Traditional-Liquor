import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../Styles/Quiz.css";
import {LinearProgress} from "@mui/material";
import {useRecoilValue} from "recoil";
import {dummyAlcoholListState} from "../Store/atom";
import RecommendItems from "../Component/RecommendItems";
import filter from "../Entity/Filter";

const Quiz = () => {
    const quizData = require("../Asset/quiz-data.json");
    const mbtiData = require("../Asset/mbti.json");
    const [quizNumber, setQuizNumber] = useState(0);
    const [conditionList, setConditionList] = useState([]);
    const [mbti, setMbti] = useState('');
    const [recommendedAlcohols, setRecommendedAlcohols] = useState([]);
    const alcoholList = useRecoilValue(dummyAlcoholListState);

    useEffect(() => {
        if (quizNumber === 8) {
            const filtered = alcoholList.filter(filter[conditionList[0]])
                .filter(filter[conditionList[1]])
                .filter(filter[conditionList[2]])
                .filter(filter[conditionList[3]]);

            const shuffled = filtered.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 3);

            setRecommendedAlcohols(selected)
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
        justifyContent: 'center',
        marginTop: '10%'
    };

    const recommendLiquorStyle = {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '10%'
    }

    const questionStyle = {
        marginBottom: '5%'
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
        <>
            <div id="question-container" style={questionContainerStyle}>
                {
                    quizNumber === quizData.length ?
                        <div id="result-container" style={resultContainerStyle}>
                            <Typography variant="h6" fontWeight="bold"
                                        style={questionStyle} >술 MBTI 결과</Typography>
                            <Typography variant="h5"
                                        style={questionStyle}>🍷{mbtiData[mbti]}🥂 인</Typography>
                            <Typography variant="h6"
                                        style={questionStyle}>당신에게 아래의 술들을 추천합니다!</Typography>
                            <div id="recommend-liquor" style={recommendLiquorStyle}>
                                <RecommendItems mbtiCharacter={mbtiData[mbti]} alcohols={recommendedAlcohols} />
                            </div>

                        </div> :
                        <>
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
                        </>
                }
            </div>
        </>
    );
};

export default Quiz;
