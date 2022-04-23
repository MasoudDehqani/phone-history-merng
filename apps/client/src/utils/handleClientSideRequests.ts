import { Dispatch } from "react"
import { PhoneStateActions } from "~components/Reducers/phoneReducer"

export default function handleClientSideRequests() {

  return ""
}

export const handleAddPhone = (brand: string, model: string, priceRange: number, dispatch: Dispatch<any>) => {
  const trimmedBrand = brand.trimEnd();
  const trimmedModel = model.trimEnd();
  const body = {
    brand: trimmedBrand,
    model: trimmedModel,
    priceRange: +priceRange
  }

  // const query = `
  //   mutation AddPhone($brand: String, $model: String, $priceRange: Int) {
  //     addPhone(brand: $brand, model: $model, priceRange: $priceRange)
  //   }`

  const query = `
    mutation ($brand: String, $model: String, $priceRange: Int) {
      addPhone(brand: $brand, model: $model, priceRange: $priceRange) {
        id
        brand
        model
        priceRange
        reviewsCount
        avgRate
      }
    }`;
  
  return async () => {
    try {
      const response = await fetch("/graphql", {
        method: "POST",
        body: JSON.stringify({
          query,
          variables: body
        }),
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })

      console.log("response: ", response)
      
      const data = await response.json()
      console.log("data: ", data)
      const { phoneId } = data;
      const payloadData = {
        phoneId, ...body
      }
    
      dispatch({ type: PhoneStateActions.ADD, payload: { dataToAdd: payloadData } })
    } catch(err) {
      console.log(err)
    }
  }
}

export const handleDeletePhone = (phoneId: string, dispatch: Dispatch<any>) => {

  const query = `
    mutation ($phoneId: ID!) {
      deletePhone(phoneId: $phoneId)
    }`
  
  return async () => {
    try {
      const response = await fetch('/graphql', {
        method: "POST",
        body: JSON.stringify({
          query,
          variables: { phoneId }
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })

      const data = await response.json()
      console.log("phoneId: ", phoneId)
      console.log("response: ", response, "data: ", data)
      dispatch({ type: PhoneStateActions.DELETE, payload: { idToDelete: { phoneId } } })
    } catch(err) {
      console.log(err)
    }
  }
}