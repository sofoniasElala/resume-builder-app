import CreateForm from "./CreateForm";
import { personalDetails, educationDetails, experienceDetails } from "./formInputData";
import './App.css';
import { useState } from "react";

function App() {
  const [allFormValues, setAllFormValues] = useState({
    personalDetailsForm: [],
    educationDetailsForm: [],
    experienceDetailsForm: [],
  })
  return (
    <>
      <main>
        <div className="forms">
          <CreateForm resume={allFormValues} updateResume={setAllFormValues} form={'personalDetailsForm'} inputData={[personalDetails, "Personal Details"]} />
          <CreateForm resume={allFormValues} updateResume={setAllFormValues} form={'educationDetailsForm'} inputData={[educationDetails, "Education"]} />
          <CreateForm resume={allFormValues} updateResume={setAllFormValues} form={'educationDetailsForm'} inputData={[experienceDetails, "Experience"]} />
        </div>
        <section></section>
      </main>
    </>
  );
}

export default App;
