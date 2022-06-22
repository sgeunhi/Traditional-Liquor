import {collection, getDocs, query} from "firebase/firestore";
import {db} from "../Firebase/service";
import {Alcohol} from "../Entity/Alcohol";

const getAlcoholWhere = async (where) => {
    const q = await query(collection(db, "alcohols"), ...where);
    const docs = await getDocs(q);
    return docs.docs.map(doc => Alcohol.fromData({ id: doc.id, ...doc.data() }));
};

export default getAlcoholWhere;