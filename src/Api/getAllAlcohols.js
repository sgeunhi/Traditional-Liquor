import {collection, getDocs} from "firebase/firestore";
import {db} from "../Firebase/service";
import {Alcohol} from "../Entity/Alcohol";

const getAllAlcohols = async () => {
    const q = await getDocs(collection(db, "alcohols"));
    const docs = await getDocs(q);
    return docs.docs.map(doc => Alcohol.fromData(Alcohol.fromData({ id: doc.id, ...doc.data() })));
};

export default getAllAlcohols;