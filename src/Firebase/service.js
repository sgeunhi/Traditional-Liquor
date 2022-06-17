import * as firebase from "firebase/app";
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
import {getHtml} from "../Api/getHtml";
import cheerio from "cheerio";
import {Alcohol} from "../Entity/Alcohol";

const firebaseConfig = {
  apiKey: "AIzaSyD0but9mklEoUTAJKEX7aTxcamlvLr6WgE",
  authDomain: "webprogramming-a287a.firebaseapp.com",
  projectId: "webprogramming-a287a",
  storageBucket: "webprogramming-a287a.appspot.com",
  messagingSenderId: "486204863182",
  appId: "1:486204863182:web:9deb56dfa940088566d69f",
  measurementId: "G-LVRPXLYL9B"
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

// firestore 전통술 저장
const saveAlcohol = () => {
  getHtml().then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.list_wrap ul.content_list").children("li");
    $bodyList.each(function (i, elem) {
      const alcohol = new Alcohol(
        $(this).find('div.iner span:nth-child(1) em.data').text(),
        'https://terms.naver.com/' + $(this).find('strong.title a').attr('href'),
        $(this).find('div.thumb_area a img').attr('data-src'),
        $(this).find('div.info_area p').text().replace(/\n|\t/g, ""),
        $(this).find('div.iner span:nth-child(2) em.data').text(),
        $(this).find('div.iner span:nth-child(3) em.data').text(),
        $(this).find('div.iner span:nth-child(4) em.data').text().split(' ')[0],
        $(this).find('div.iner span:nth-child(5) em.data').text().split('(')[0].replace(" \g", "").replace("￦", ""))
      ulList[i] = alcohol;
      // console.log(alcohol);
    });
    return ulList;
  }).then(res => {
    res.map(data => {
      const _data = data;
      addDoc(collection(db, "alcohols"), {
        name: _data.name,
        detailUrl: _data.detailUrl,
        imageUrl: _data.imageUrl,
        description: _data.description,
        typeofAlcohol: _data.typeofAlcohol,
        alcohol: _data.alcohol,
        volume: _data.volume,
        price: _data.price
      });
    })
  })
  console.log("saved!!")
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  saveAlcohol,
};
