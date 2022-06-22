import {Autocomplete, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import alcohol_icon from "../Asset/alcohol-icon.png";
import {Link as RouterLink} from "react-router-dom";
import * as React from "react";

const QuizHeader = () => {
    return (
        <header>
            <nav className="header-nav">
                <div id="header-nav-left">
                    <span>Snu-Liquor | 전통주</span>
                </div>
                <div id="header-nav-right"/>
            </nav>
            <div className="header-top">
                <div className="container">
                    <div className="right-top-container" style={{ visibility: 'hidden' }}>
                        <Autocomplete
                            style={{width: "50%", border: "0"}}
                            disablePortal
                            id="combo-box-demo"
                            options={["1", "2", "3", "4"]}
                            sx={{
                                width: 300,
                                ".MuiOutlinedInput-root": {
                                    borderRadius: 50,
                                    borderColor: "red",
                                    borderWidth: 0,
                                }
                            }}
                            renderInput={(params) => <TextField {...params} label="술을 검색해보세요..." size="small"/>}
                        />
                        <SearchIcon id="search-icon" style={{fontSize: "2rem"}}/>
                    </div>
                    <div className="center-top-container">
                        <img id="alcohol-icon" src={alcohol_icon} alt="alcohol"/>
                        <span id="site-name" style={{fontSize: "1.4rem", color: "black"}}>Snu-Liquor</span>
                    </div>
                    <div className="left-top-container">
                        <RouterLink id="home" style={{borderRadius: "3%"}} component={RouterLink} to="/home">홈으로 가기</RouterLink>
                    </div>
                </div>
                <div className="header-menu">
                    <li id="liquor-list">
                        <ul>술 MBTI 검사</ul>
                    </li>
                </div>
            </div>
        </header>
    );
}

export default QuizHeader;