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
  id: string,
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
  id: string,
  rate: number,
  text: string
}

export interface PhoneReviewDataType {
  brand: string,
  model: string,
  avgRate: number | null,
  reviews: PhoneReviewType[]
}

export enum CrudMethods {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT"
}