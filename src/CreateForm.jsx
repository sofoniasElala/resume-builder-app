import { useState } from "react";
import AddedForms from "./addedForms";
import { v4 as uuidv4 } from "uuid";

export default function CreateForm({ inputData }) {
  const [inputsVisible, setInputVisible] = useState(false);
  const [savedValues, setSavedValues] = useState([]);
  const [currentValues, setCurrentValues] = useState({ id: null, values: [] });
  const [editButtonsVisible, setEditButtonsVisible] = useState(false);

  const formHeader = inputData[1];
  const inputElements = (value = []) => {
    return inputData[0].map((input) => {
      return (
        <label key={input.name}>
          {input.name}{" "}
          <input
            name={input.name}
            placeholder={input.placeholder}
            type={input.type}
            defaultValue={value.pop()}
          />
        </label>
      );
    });
  };

  function newInput() {
    handleInputVisible();
    setCurrentValues({ id: null, values: [] });
  }

  function handleInputVisible() {
    setInputVisible(!inputsVisible);
  }

  function deleteForm(id){
    const newAddedForms = savedValues.filter(values => values.id !== id);
    setSavedValues(newAddedForms);
  }

  function handleEditInputVisible() {
    setEditButtonsVisible(!editButtonsVisible);
  }

  function updateCurrentValue(id, updatedValue) {
    setCurrentValues({ id, values: updatedValue });
    handleInputVisible();
    handleEditInputVisible();
    console.log(savedValues);
  }

  function handleForm(e) {
    e.preventDefault();

    let updated = false;
    const form = e.currentTarget;
    const formData = new FormData(form);
    const inputValue = Array.from(formData.values());
    const newPossibleValues = savedValues.map((values) => {
      if (values.id === currentValues.id) {
        updated = true;
        return { id: values.id, values: inputValue };
      }
      return values;
    });
    const newValues = updated
      ? [...newPossibleValues]
      : [...savedValues, { id: uuidv4(), values: inputValue }];


    setSavedValues(newValues);

    handleInputVisible();
    // setFormInstances([...formInstances, {tab: <div onClick={() => setEditInputVisible(!editInputVisible)} className="tab">{inputValue[0]}</div>, inputElements}]);
    // {formInstances.map((instance, index) => <Fragment key={index}>{instance.tab}</Fragment>)}
    //
  }

  return (
    <>
      <form onSubmit={(e) => handleForm(e)}>
        <h2>{formHeader}</h2>
        {!inputsVisible && (
          <AddedForms
            savedValues={savedValues}
            updateCurrentValue={updateCurrentValue}
            inputElements={inputElements}
            deleteForm={deleteForm}
          />
        )}
        {((!inputsVisible && formHeader !== "Personal Details") || (!inputsVisible && formHeader === "Personal Details" && savedValues.length === 0)) && (
          <button type="button" onClick={newInput} className="add">
            {"Add"}
          </button>
        )} 
        {inputsVisible && inputElements([...currentValues.values])}
        
        {inputsVisible && (
            <div className="save-cancel">
              <button onClick={handleInputVisible}>Cancel</button>
              <button type="submit">Save</button>
            </div>
          )
        }
      </form>
    </>
  );
}
