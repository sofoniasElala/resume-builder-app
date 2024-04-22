import { useState } from "react";
import AddedForms from "./addedForms";

export default function CreateForm({ inputData }) {
  const [inputsVisible, setInputVisible] = useState(false);
  const [savedValues, setSavedValues] = useState([]);

  const formHeader = inputData[1];
  const inputElements = (value=[]) => { return inputData[0].map((input) => {
    return (
      <label key={input.name}>
        {input.name}{" "}
        <input name={input.name} placeholder={input.placeholder} type={input.type} defaultValue={value.pop()}/>
      </label>
    );
  });}

  const [currentValues, setCurrentValues] = useState(inputElements());

  function newInput(){
    handleInputVisible();
    setCurrentValues(inputElements());
  }

  function handleInputVisible(){
    setInputVisible(!inputsVisible);
  }

  function updateCurrentValue(value){
    setCurrentValues(value);
    console.log(savedValues);
  }

  function handleForm(e){
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const inputValue = Array.from(formData.values());

    setSavedValues([...savedValues, inputValue]);
    

    handleInputVisible();
   // setFormInstances([...formInstances, {tab: <div onClick={() => setEditInputVisible(!editInputVisible)} className="tab">{inputValue[0]}</div>, inputElements}]);
   // {formInstances.map((instance, index) => <Fragment key={index}>{instance.tab}</Fragment>)}
   // 
  }

  return (
    <>
      <form  onSubmit={(e) => handleForm(e)}>
        <h2>{formHeader}</h2>
        <AddedForms savedValues={savedValues} updateCurrentValue={updateCurrentValue} inputElements={inputElements} visible={handleInputVisible}/>
        {formHeader !== "Personal Details" && !inputsVisible ? (
          <button type='button' onClick={newInput} className="add">{"Add"}</button>
        ) : currentValues}
        {(inputsVisible || formHeader === "Personal Details") && <button type='submit'>Save</button>}
      </form>
    </>
  );
}
