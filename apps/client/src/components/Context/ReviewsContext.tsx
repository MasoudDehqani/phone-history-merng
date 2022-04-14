import { Dispatch, createContext } from "react";
import { PhoneReviewType, ReviewType } from "~utils/types";

const reviewsContextDefaultValue = { refreshReviews: () => {} }
const ReviewsContext = createContext(reviewsContextDefaultValue)

export default ReviewsContext;