import * as React from 'react';
import {Button} from "@mui/material";
import {auth, logout} from "../Firebase/service";
import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) navigate("/");
  }, [user, loading]);
  return (
    <div>
      <h3>안녕하세요. 메인 페이지 입니다.</h3>
      <Button onClick={() => logout()}>로그아웃</Button>
    </div>
  );
};

export default Home;
