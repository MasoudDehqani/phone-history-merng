import { Dispatch } from "react"
import { PhoneStateActions } from "~components/Reducers/phoneReducer"

export default function handleClientSideRequests() {

  return ""
}

export const handleAddPhone = (brand: string, model: string, priceRange: number, dispatch: Dispatch<any>) => {
  // const trimmedBrand = brand.trimEnd();
  // const trimmedModel = model.trimEnd();
  // const body = {
  //   brand: trimmedBrand,
  //   model: trimmedModel,
  //   priceRange: +priceRange
  // }
  // return async () => {
  //   const response = await fetch("http://localhost:5001/api/v1/phones", {
  //     method: "POST",
  //     body: JSON.stringify(body),
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //   })
  
  //   const { data } = await response.json()
  //   const { phoneId } = data;
  //   const payloadData = {
  //     phoneId, ...body
  //   }
  
  //   dispatch({ type: PhoneStateActions.ADD, payload: { dataToAdd: payloadData } })
  // }
}
