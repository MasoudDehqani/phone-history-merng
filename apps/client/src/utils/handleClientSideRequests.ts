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

  const query = `
    mutation {
      addPhone(brand: "${trimmedBrand}", model: "${trimmedModel}", priceRange: ${+priceRange}) {
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
    
      const { data } = await response.json()
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
