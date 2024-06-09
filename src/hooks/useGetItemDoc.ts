import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firestore";
import { Item, Category } from "../types/types";
import { changeLoadingState } from "../store/reducers/IsLoading";
import { useDispatch } from "react-redux";

const useGetItemDoc = (collectionName: string, documentId: string) => {
  const [documentData, setDocumentData] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        dispatch(changeLoadingState(true))
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("doc snap exists");
          const data = docSnap.data() as Item;

          const categoryRef = docSnap.data().categoryId;

          if (categoryRef) {
            console.log("category doc exists");
            const categoryDocSnap = await getDoc(categoryRef);
            const categoryData=categoryDocSnap.data() as Category

            const updatedData: Item = {
              ...data,
              categoryName: categoryData.name,
            };
            setDocumentData(updatedData);
          } else {
            setIsNotFound(true);
            setDocumentData(null);
          }
        } else {
          setIsNotFound(true);
          setDocumentData(null);
        }
      } catch (error) {
        setIsError(true);
        setDocumentData(null);
        console.log(error);
      } finally {
        setIsLoading(false);
        dispatch(changeLoadingState(false))
      }
    };

    fetchData();
  }, [collectionName, documentId]);

  return [documentData, isLoading, isNotFound, isError];
};

export default useGetItemDoc;
