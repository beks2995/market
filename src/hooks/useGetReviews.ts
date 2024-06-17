import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firestore";
import { Review } from "../types/types";

const useGetReviews = (itemId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const reviewsCollection = collection(db, `items/${itemId}/reviews`);
        const reviewsSnapshot = await getDocs(reviewsCollection);

        const reviewsList: Review[] = reviewsSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        } as Review));
        
        setReviews(reviewsList);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [itemId]);

  return [reviews, isLoading, isError];
};

export default useGetReviews;
