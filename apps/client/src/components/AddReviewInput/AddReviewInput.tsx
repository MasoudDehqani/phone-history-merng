// import BaseUrls from "constants/baseUrls"
import { useRouter } from "next/router"
import { useState } from "react"
import useInputValues from "~components/Hooks/useInputValues"
import { CrudMethods } from "~utils/types"
import useReviewsContext from "~components/Hooks/useReviewsContext"

export default function AddReviewInput() {

  const router = useRouter()
  // console.log(router)

  const { refreshReviews } = useReviewsContext()
  const { inputValues, handleInputValues } = useInputValues({
    rateInput: 1.0,
    reviewInput: "",
  })

  const [reviewId, setReviewId] = useState("")

  const { rateInput, reviewInput } = inputValues;

  const handleAddReview = async () => {
    const body = {
      reviewId: "",
      reviewRate: rateInput,
      reviewText: reviewInput
    }
    
    // const response = await fetch(`${BaseUrls.ReviewsBaseUrl}${router.query.reviewCategory}`, {
    //   method: CrudMethods.POST,
    //   body: JSON.stringify(body),
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    // })

    // const data = await response.json()
    // setReviewId(data.data.id)
    // refreshReviews()
  }

  return (
    <div>
      <label className="block" htmlFor="rateInput">RATE: </label>
      <input
        className="
          block
          w-56
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-3
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        type="number" 
        name="rateInput"
        id="rateInput"
        value={rateInput} 
        step={0.1} 
        min={1.0} 
        max={5.0} 
        onChange={handleInputValues}
      />

      <label 
        htmlFor="reviewInput" 
        className="form-label inline-block mb-2 text-gray-700"
      >
        Review:
      </label>
    <textarea
      className="
        form-control
        block
        w-4/5
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-3
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      id="reviewInput"
      rows={3}
      placeholder="Your message"
      onChange={handleInputValues} value={reviewInput} name="reviewInput"
    ></textarea>
      <button onClick={handleAddReview} className="bg-purple-400 rounded-md p-2 mx-2">SEND REVIEW</button>
    </div>
  )
}
