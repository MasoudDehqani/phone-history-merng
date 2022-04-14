export type PhonesDataType = {
  status: string,
  data: {
    phones: PhoneType[]
  }
}

export type ReviewsDataType = {
  status: string,
  data: {
    reviews: any
  }
}

export type PhoneType = {
  phoneId: string,
  brand: string,
  model: string,
  priceRange: 1 | 2 | 3 | 4 | 5,
  avgRate: number | null,
  reviewsCount: number
}

export type ReviewType = {
  reviewId: string,
  rate: number,
  reviewText: string
}

export interface PhoneReviewType {
  brand: string,
  model: string,
  reviewId: string,
  reviewRate: number,
  reviewText: string
}

export interface PhoneReviewDataType {
  brand: string,
  model: string,
  noReview: boolean,
  reviews: PhoneReviewType[]
}

export enum CrudMethods {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT"
}