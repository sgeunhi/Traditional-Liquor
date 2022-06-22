import React, {useEffect, useState} from "react";
import {Link as RouterLink, useNavigate, useLocation} from "react-router-dom";
import {auth, logInWithEmailAndPassword, signInWithGoogle} from "../Firebase/service";
import {useAuthState} from "react-firebase-hooks/auth";
import "../Styles/Login.css";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import GoogleButton from "react-google-button";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      navigate('/home')
    }
  }, [user, loading]);

  return (
    <div className="login">
      <div className="login-container">
        <GoogleButton onClick={signInWithGoogle} style={{marginBottom: 10, width: 260}}/>
        <Typography variant="body1" color="#545454">or</Typography>
        <TextField
          label="Email"
          sx={{width: 260, height: 40, marginBottom: 3}}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="yours@example.com"
        />
        <TextField
          label="Password"
          sx={{width: 260, height: 40, marginBottom: 5}}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="your password"
        />
        <Button
          variant="contained"
          sx={{width: 260, height: 40, marginBottom: 3}}
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          로그인
        </Button>
        <Link underline="hover" component={RouterLink} to="/register">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default Login;
