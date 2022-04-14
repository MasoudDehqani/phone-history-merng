import { useContext } from "react";
import PhonesContext from "~components/Context/PhonesContext";

export default function usePhoneContext() {
  return useContext(PhonesContext)
}