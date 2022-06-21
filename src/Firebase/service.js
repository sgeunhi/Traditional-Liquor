import firebase from "firebase/compat/app"
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  setDoc,
  addDoc,
} from "firebase/firestore";

//
// const firebaseConfig = {
//   apiKey: "AIzaSyD0but9mklEoUTAJKEX7aTxcamlvLr6WgE",
//   authDomain: "webprogramming-a287a.firebaseapp.com",
//   projectId: "webprogramming-a287a",
//   storageBucket: "webprogramming-a287a.appspot.com",
//   messagingSenderId: "486204863182",
//   appId: "1:486204863182:web:9deb56dfa940088566d69f",
//   measurementId: "G-LVRPXLYL9B"
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyD0but9mklEoUTAJKEX7aTxcamlvLr6WgE",
//   authDomain: "webprogramming-a287a.firebaseapp.com",
//   projectId: "webprogramming-a287a",
//   storageBucket: "webprogramming-a287a.appspot.com",
//   messagingSenderId: "486204863182",
//   appId: "1:486204863182:web:9deb56dfa940088566d69f",
//   measurementId: "G-LVRPXLYL9B"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCdEhXlF6OpDzXQ9mOl-nOVv_zYHsjp7vU",
  authDomain: "last-wepprogramming.firebaseapp.com",
  projectId: "last-wepprogramming",
  storageBucket: "last-wepprogramming.appspot.com",
  messagingSenderId: "458432658680",
  appId: "1:458432658680:web:8c304ea05b70e1ea5c8f0d",
  measurementId: "G-SKGD7Z2LG2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const analytics = getAnalytics(app);

// 구글 로그인
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// 이메일 비밀번호 로그인
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


//이메일 비밀번호 회원가입
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// 비밀번호 재설정
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// 로그아웃
const logout = () => {
  signOut(auth);
  alert("로그아웃")
};

export {
  auth,
  db,
  firebase,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
