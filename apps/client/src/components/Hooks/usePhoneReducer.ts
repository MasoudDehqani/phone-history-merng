import { useReducer } from "react";
import phoneReducer from "~components/Reducers/phoneReducer";
import { PhoneType } from "~utils/types";

export default function usePhoneReducer(initialData: PhoneType[]) {
  return useReducer(phoneReducer, initialData)
}
