import { useContext } from "react";
import ReviewsContext from "~components/Context/ReviewsContext";

export default function useReviewsContext() {
  return useContext(ReviewsContext)
}