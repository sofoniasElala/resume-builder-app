import CreateForm from "./CreateForm";
import { personalDetails, educationDetails, experienceDetails } from "./formInputData";
import ResumeDisplay from "./resumeDisplay";
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
          <CreateForm resume={allFormValues} updateResume={setAllFormValues} form={'experienceDetailsForm'} inputData={[experienceDetails, "Experience"]} />
          <CreateForm resume={allFormValues} updateResume={setAllFormValues} form={'educationDetailsForm'} inputData={[educationDetails, "Education"]} />
        </div>
        <section>
          <ResumeDisplay allFormValues={allFormValues} allPlaceholders={{personalDetails, educationDetails, experienceDetails}}/>
        </section>
      </main>
    </>
  );
}

export default App;
