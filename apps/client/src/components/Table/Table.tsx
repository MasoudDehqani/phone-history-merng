import Link from "next/link"
import { Dispatch, useContext, useEffect } from "react"
import usePhoneContext from "~components/Hooks/usePhoneContext"
import { PhoneStateActions } from "~components/Reducers/phoneReducer"
import type { PhoneType } from "~utils/types"
import ratingStyles from "../../../styles/rating.module.css"
import { handleDeletePhone } from "~utils/handleClientSideRequests"

export default function Table() {

  const { phonesData, dispatch } = usePhoneContext()

  // useEffect(() => {
  //   dispatch({ type: PhoneStateActions.FILL, payload: phonesData })
  // }, [dispatch, phonesData])


  const mapPhonesToTableRows = ({ id, brand, model, priceRange: priceRange, avgRate: avgRate, reviewsCount } : PhoneType) => {

    const tdClassName = "border text-center px-8 py-4"
    const priceRangeSymbol = "$"
    const ratingPercent = (Number(avgRate) * 100) / 5;

    return (
      <tr key={id}>
        <td className={tdClassName}>
          <Link href={`/brands/${brand}`}>
            <a>{brand}</a>
          </Link>
        </td>
        <td className={tdClassName}>
          <Link href={`/phone-models/${model}`}>
            <a>{model}</a>
          </Link>
        </td>
        <td className={tdClassName}>
          <Link href={`/price-ranges/${priceRange}`}>
            <a>{priceRangeSymbol.repeat(priceRange)}</a>
          </Link>
        </td>
        <td className={tdClassName}>
          <Link href={{ pathname: `/phone-reviews/${id}` }}>
            <a>
              <div className="flex w-full items-center">
                <div className="text-gray-400 text-xl relative m-0 p-0" style={{ unicodeBidi: "bidi-override" }}>
                  <div className={ratingStyles["fill-ratings"]} style={{ width: `${ratingPercent}%` }}>
                    <span className={ratingStyles["rating-stars"]}>★★★★★</span>
                  </div>
                  <div className={ratingStyles["empty-ratings"]}>
                    <span>★★★★★</span>
                  </div>
                </div>
                <span className="ml-1 text-sm text-gray-600">({avgRate || 0} / {reviewsCount})</span>
              </div>
            </a>
          </Link>
        </td>
        <td className={tdClassName}>
          <button className="text-red-600" onClick={handleDeletePhone(id, dispatch)}>DELETE</button>
        </td>
      </tr>
    )
  }

  return (
    <div className="flex justify-center w-full">
      <table className="shadow-lg bg-white">
        <thead>
          <tr>
            <th className="bg-blue-100 border text-center px-8 py-4">Brand</th>
            <th className="bg-blue-100 border text-center px-8 py-4">Model</th>
            <th className="bg-blue-100 border text-center px-8 py-4">Price Range</th>
          </tr>
        </thead>
        <tbody>
          {phonesData.map(mapPhonesToTableRows)}
        </tbody>
      </table>
    </div>
  )
}