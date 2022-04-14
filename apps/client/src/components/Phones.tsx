import { useRouter } from "next/router";
import { Dispatch, useContext, useEffect } from "react";
import { PhonesDataType, PhoneType } from "~utils/types";
import AddPhoneInputs from "./AddPhoneInput/AddPhoneInputs";
import PhonesContext from "./Context/PhonesContext";
// import MainDataContextProvider from "./Context/MainDataContext";
import Header from "./Header/Header";
import usePhoneContext from "./Hooks/usePhoneContext";
import usePhoneReducer from "./Hooks/usePhoneReducer";
import { PhoneStateActions } from "./Reducers/phoneReducer";
import Table from "./Table/Table";

export default function Phones({ data } : { data: PhoneType[] }) {

  const [phonesData, dispatch] = usePhoneReducer(data)
  console.log(data)
  const router = useRouter()

  return (
    <PhonesContext.Provider value={{ phonesData, dispatch }}>
      <Header text="Mobile History" />
      {router.asPath === "/" ? <AddPhoneInputs /> : null}
      <Table />
    </PhonesContext.Provider>
  )
}