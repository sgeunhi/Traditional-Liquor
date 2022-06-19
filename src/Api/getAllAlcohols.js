import {collection, getDocs} from "firebase/firestore";
import {db, firebase} from "../Firebase/service";
import {Alcohol} from "../Entity/Alcohol";

const getAllAlcohols = async () => {
  const querySnapshot = await getDocs(collection(db, "alcohols"));
  return querySnapshot.docs.map(doc => Alcohol.fromData({id: doc.id, ...doc.data()}));
};

export default getAllAlcohols;
