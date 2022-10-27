import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase.config";
import { useEffect } from "react";

const useFetchSingleProduct = (collection, id) => {
  const [userData, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProductById = async () => {
    setLoading(true);

    const docRef = doc(db, `${collection}`, id);
    const docsnap = await getDoc(docRef);
    setLoading(false);

    if (docsnap.exists) {
      setData(docsnap.data());
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  return {
    userData,
    loading,
  };
};

export default useFetchSingleProduct;
