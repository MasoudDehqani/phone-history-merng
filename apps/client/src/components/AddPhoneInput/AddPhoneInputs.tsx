import { Dispatch, useState } from "react";
import useInputValues from "~components/Hooks/useInputValues";
import usePhoneContext from "~components/Hooks/usePhoneContext";
import { handleAddPhone } from "~utils/handleClientSideRequests";

export default function AddPhoneInputs() {

  const { inputValues: { brand, model, priceRange }, handleInputValues } = useInputValues({
    brand: "",
    model: "",
    priceRange: 1
  })

  console.log(model, brand, priceRange)
  const { dispatch } = usePhoneContext()

  // const handleInputValues = (inputId: string, newInputValue: string | number) => {
  //   setInputValues((prevState: ) => ({ ...prevState, [inputId]: newInputValue }))
  // }

  return (
    <div className="flex flex-row justify-between lg:justify-around m-auto md:w-full sm:w-full lg:w-3/4 xl:w-1/2 px-5 mb-10">
      <div className="md:flex flex-row md:items-center mb-6">
        <div>
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pl-6 pr-2" htmlFor="brandName">
            Brand:
          </label>
        </div>
        <div>
          <input 
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-40 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
            value={brand} 
            onChange={handleInputValues} 
            id="brand" 
            type="text" 
            placeholder="Brand" 
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div >
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pl-6 pr-2" htmlFor="modelName">
            Model:
          </label>
        </div>
        <div>
          <input 
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-40 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
            value={model} 
            onChange={handleInputValues} 
            id="model" 
            type="text" 
            placeholder="Model" 
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div >
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pl-6 pr-2" htmlFor="priceRange">
            Price Range:
          </label>
        </div>
        <div>
          <input 
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-40 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
            value={priceRange} 
            onChange={handleInputValues} 
            id="priceRange" 
            type="number" 
            step={1} 
            max={5} 
            min={1} 
            placeholder="Price Range" 
          />
        </div>
      </div>
      <button 
        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mb-6" 
        type="button"
        onClick={handleAddPhone(brand, model, priceRange, dispatch)}
      >
        Add Phone
      </button>
    </div>
  )
}