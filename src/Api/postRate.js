import {addDoc, collection} from "firebase/firestore";
import {db} from "../Firebase/service";

const postRate = async (rate) => {
    await addDoc(collection(db, "rates"), rate.toData());
}

export default postRate;