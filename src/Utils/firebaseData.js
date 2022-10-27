import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase.config";

export const saveItem = async (data) => {
  await setDoc(doc(db, "shopverseItem", `${Date.now()}`), data, {
    merge: true,
  });
};
