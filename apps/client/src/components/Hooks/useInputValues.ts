import { ChangeEvent, useState } from "react";

export default function useInputValues(initialValue: { [key: string]: any }) {
  const [inputValues, setInputValues] = useState(initialValue)

  const handleInputValues = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setInputValues(prevState => ({
      ...prevState,
      [id]: value.trimStart().replace(/\s\s+/g, ' ')
    }))
  }

  return { inputValues, handleInputValues }
}
