// dependencies
import { useState } from "react";

/**
 * take object as argument and handle input change, handle form reset and return input state
 * @param {*} initialState : expecting object
 * @returns return input state, input change handler & reset form handler
 */
const useForm = (initialState) => {
  // input state management
  const [input, setInput] = useState(initialState);

  // handle input change
  const handleInputChange = (e) => {
    // get input information
    const { type, value, name, checked } = e.target;

    // update state
    setInput((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handle form reset
  const resetForm = () => {
    setInput(initialState);
  };

  // return input state, input change handler & reset form handler
  return { input, setInput, handleInputChange, resetForm };
};

export default useForm;
