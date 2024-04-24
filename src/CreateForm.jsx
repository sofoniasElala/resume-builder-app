import { Fragment, useState } from "react";
import AddedForms from "./addedForms";
import { v4 as uuidv4 } from "uuid";

export default function CreateForm({ resume, updateResume, inputData, form }) {
  const [inputsVisible, setInputVisible] = useState(false);
  const [currentValues, setCurrentValues] = useState({ id: null, values: [] });
  const [editButtonsVisible, setEditButtonsVisible] = useState(false);

  const formHeader = inputData[1];
  const inputElements = (value = []) => {
    return inputData[0].map((input) => {
      if(input.type !== 'textarea'){
      return (
        <Fragment key={input.name} >
        <label >
          {input.name}{" "}
          <input
            name={input.name}
            placeholder={input.placeholder}
            type={input.type}
            defaultValue={value.pop()}
          />
        </label>
        </Fragment>
      ); } else {
       return  <textarea  key={input.name} name={"Short Description"} rows="5" defaultValue={value.pop()}placeholder={"Short Description"}></textarea>
      }
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
    const newAddedForms = resume[form].filter(values => values.id !== id);
    updateResume({...resume, [form]: newAddedForms});
  }

  function handleEditInputVisible() {
    setEditButtonsVisible(!editButtonsVisible);
  }

  function updateCurrentValue(id, updatedValue) {
    setCurrentValues({ id, values: updatedValue });
    handleInputVisible();
    handleEditInputVisible();
  }

  function handleForm(e) {
    e.preventDefault();

    let updated = false;
    const formInputs = e.currentTarget;
    const formData = new FormData(formInputs);
    const inputValue = Array.from(formData.values());
    const newPossibleValues = resume[form].map((values) => {
      if (values.id === currentValues.id) {
        updated = true;
        return { id: values.id, values: inputValue };
      }
      return values;
    });
    const newValues = updated
      ? [...newPossibleValues]
      : [...resume[form], { id: uuidv4(), values: inputValue }];


    updateResume({...resume, [form]: newValues});

    handleInputVisible();
  }

  return (
    <>
      <form onSubmit={(e) => handleForm(e)}>
        <h2>{formHeader}</h2>
        {!inputsVisible && (
          <AddedForms
            resume={resume[form]}
            updateCurrentValue={updateCurrentValue}
            inputElements={inputElements}
            deleteForm={deleteForm}
          />
        )}
        {((!inputsVisible && formHeader !== "Personal Details") || (!inputsVisible && formHeader === "Personal Details" && resume[form].length === 0)) && (
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
