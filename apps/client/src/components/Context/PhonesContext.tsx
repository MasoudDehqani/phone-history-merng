import { createContext, Dispatch, ReactNode, useReducer } from "react";
import phoneReducer from "~components/Reducers/phoneReducer";
import { PhoneType } from "~utils/types";

const contextDefaultValue = { phonesData: [], dispatch: () => {} }
const PhonesContext = createContext<{ phonesData: PhoneType[], dispatch: Dispatch<any> }>(contextDefaultValue)

export default PhonesContext;

// export default function MainDataContextProvider({ children } : { children: ReactNode }) {
//   const [phonesData, dispatch] = useReducer(phoneReducer, [])

//   return (
//     <PhoneDataContext.Provider value={{ phonesData, dispatch }}>
//       {children}
//     </PhoneDataContext.Provider>
//   )
// }