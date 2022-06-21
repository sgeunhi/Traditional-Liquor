import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../Styles/Quiz.css";
import {LinearProgress} from "@mui/material";
import {useRecoilValue} from "recoil";
import RecommendItems from "../Component/RecommendItems";
import filter from "../Entity/Filter";
import {alcoholListState} from "../Store/selector";

const Quiz = () => {
    const quizData = require("../Asset/quiz-data.json");
    const mbtiData = require("../Asset/mbti.json");
    const [quizNumber, setQuizNumber] = useState(0);
    const [conditionList, setConditionList] = useState([]);
    const [mbti, setMbti] = useState('');
    const [recommendedAlcohols, setRecommendedAlcohols] = useState([]);
    const alcoholList = useRecoilValue(alcoholListState);

    useEffect(() => {
        if (quizNumber === 8) {
            console.log(conditionList);
            const filtered = alcoholList.filter(_alcohol => filter.matchConditions(_alcohol, conditionList));
            const shuffled = filtered.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 3);
            console.log(selected);

            setRecommendedAlcohols(selected);
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

    return (
        <>
            <div id="question-container">
                {
                    quizNumber === quizData.length ?
                        <div id="result-container">
                            <Typography variant="h6" fontWeight="bold"
                                        style={{marginBottom: '5%'}}>술 MBTI 결과</Typography>
                            <Typography variant="h5"
                                        style={{marginBottom: '5%'}}>🍷{mbtiData[mbti]}🥂 인</Typography>

                            {recommendedAlcohols.length === 0 ?
                                <Typography variant="h6"
                                            style={{marginBottom: '5%'}}>당신이 좋아할만한 술을 찾지 못했어요.😭<br/> 조만간 더 좋은 술을 찾아올게요!</Typography>
                                :
                                <>
                                    <Typography variant="h6"
                                                style={{marginBottom: '5%'}}>당신에게 아래의 술들을 추천합니다!</Typography>
                                    <div id="recommend-liquor">
                                        <RecommendItems mbtiCharacter={mbtiData[mbti]} alcohols={recommendedAlcohols}/>
                                    </div>
                                </>
                            }
                        </div> :
                        <>
                            <div id="question">
                                <Typography variant="h5"
                                            style={{marginBottom: '5%'}}>{quizData[quizNumber].question}</Typography>
                            </div>
                            <div id="answer">
                                <Button id="answer-button" variant="outlined" color="secondary" size="large"
                                        onClick={() => onAnswerSelected(quizNumber, quizData[quizNumber].answers[0])}>{quizData[quizNumber].answers[0].text}</Button>
                                <Button id="answer-button" variant="outlined" color="secondary" size="large"
                                        onClick={() => onAnswerSelected(quizNumber, quizData[quizNumber].answers[1])}>{quizData[quizNumber].answers[1].text}</Button>
                                <LinearProgress style={{width: '24rem'}} variant="determinate" color="secondary"
                                                value={(quizNumber + 1) / quizData.length * 100}/>
                                <Typography id="question-count">
                                    {`${quizNumber + 1} / ${quizData.length}`}</Typography>
                            </div>
                        </>
                }
            </div>
        </>
    );
};

export default Quiz;
