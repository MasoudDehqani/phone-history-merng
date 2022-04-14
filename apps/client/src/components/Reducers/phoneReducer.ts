import type { PhoneType } from '../../utils/types'

type PriceRangeType = 1 | 2 | 3 | 4 | 5 

export enum PhoneStateActions {
  DELETE = "DELETE",
  ADD = "ADD",
  FILL = "FILL"
}

interface AddPayloadType extends PhoneType {
  reviewsCount: number
}

interface DeletePayloadType {
  phoneId: string,
}

interface FillPayloadType extends PhoneType {
  avgRate: number | null,
  reviewsCount: number
}


interface ActionType {
  type: PhoneStateActions,
  payload: {
    dataToAdd?: AddPayloadType,
    idToDelete?: DeletePayloadType,
    arrayToFill?: FillPayloadType[]
  }
}


export default function phoneReducer(state: PhoneType[], action: ActionType): PhoneType[] {
  switch (action.type) {
    case PhoneStateActions.ADD: {
      if (action.payload.dataToAdd) {
        const { phoneId, brand, model, priceRange, reviewsCount } = action.payload.dataToAdd;
        console.log("action.payload.dataToAdd: ", action.payload.dataToAdd)
        console.log("reducer: ", { phoneId, brand, model, priceRange, avgRate: null, reviewsCount })
        return [...state, { phoneId, brand, model, priceRange, avgRate: null, reviewsCount }]
      }
      return []
    };
    case PhoneStateActions.DELETE: {
      return state.filter(({ phoneId }) => {
        console.log(phoneId)
        if (action.payload.idToDelete) console.log(action.payload.idToDelete.phoneId)
        if (action.payload.idToDelete) return phoneId !== action.payload.idToDelete.phoneId
        return false
      })
    };
    case PhoneStateActions.FILL: {
      if (action.payload.arrayToFill) return action.payload.arrayToFill
      return []
    };
    default: {
      return []
    }
  }
}