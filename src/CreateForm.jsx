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

  const [currentValues, setCurrentValues] = useState({id: null, values: []});

  function newInput(){
    handleInputVisible();
    setCurrentValues({id: null, values: []});
  }

  function handleInputVisible(){
    setInputVisible(!inputsVisible);
  }

  function updateCurrentValue(id, updatedValue){
    setCurrentValues({id, values: updatedValue});
    console.log(savedValues);
  }

  function handleForm(e){
    e.preventDefault();

    let updated = false;
    const form = e.currentTarget;
    const formData = new FormData(form);
    const inputValue = Array.from(formData.values());
    const newPossibleValues = savedValues.map(values => {
      if(values.id === currentValues.id) {
        updated = true;
        return {id: values.id, values: inputValue}
      }
      return values;
    })
    const newValues = updated ? [...newPossibleValues] : [...savedValues, {id: savedValues.length, values: inputValue}];

    setSavedValues(newValues);
    

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
        ) : inputElements([...currentValues.values])}
        {(inputsVisible || formHeader === "Personal Details") && <button type='submit'>Save</button>}
      </form>
    </>
  );
}
