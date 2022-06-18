import * as React from 'react';
import KakaoShareButton from "../Component/KakaoShareButton";
import {useState} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import quizData from "../Asset/quiz-data.json";
import {Box} from "@mui/material";

const Quiz = () => {
    const quizData = require("../Asset/quiz-data.json");
    const [quizNumber, setQuizNumber] = useState(0);
    const [whereList, setWhereList] = useState(null);
    const [mbti, setMbti] = useState('');

    const appendWhereClause = (where) => {
        const splitWhere = where.split(" ");
    }

    const questionBoxStyle = {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const questionStyle = {
        marginBottom: '20px'
    };

    const buttonStyle = {
        fontSize: '.8rem',
        fontWeight: '800',
        height: '9em',
        width: '20rem',
        margin: '0.5em'
    };

    const questionCountStyle = {
        marginTop: '1rem',
        fontSize: '1.3rem',
        fontWeight: '800'
    };

    return (
        <div style={questionBoxStyle}>
            <div id="question">
                <Typography variant="h5" style={questionStyle}>{quizData[quizNumber].question}</Typography>
            </div>
            <Button variant="outlined" color="secondary" size="large" style={buttonStyle} onClick={() => setQuizNumber(quizNumber + 1)}>{quizData[quizNumber].answers[0].text}</Button>
            <Button variant="outlined" color="secondary" size="large" style={buttonStyle} onClick={() => setQuizNumber(quizNumber + 1)}>{quizData[quizNumber].answers[1].text}</Button>
            <div>
                <Typography style={questionCountStyle}>{`${quizNumber + 1} / ${quizData.length}`}</Typography>
            </div>
            {
                quizNumber === quizData.length - 1 ? <div>
                    <Box
                        component="img"
                        sx={{
                            height: 233,
                            width: 350,
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 350, md: 250 },
                        }}
                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                    />
                </div> : <div></div>
            }

        </div>
    );
};

export default Quiz;
