import CreateForm from "./CreateForm";
import { personalDetails, educationDetails, experienceDetails } from "./formInputData";
import ResumeDisplay from "./resumeDisplay";
import './App.css';
import { useState } from "react";
import downloadIcon from './assets/download-solid.svg';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

 function downloadResumePDF(name){


   html2canvas(document.querySelector('.display')).then(canvas => {

    const imgData = canvas.toDataURL('image/png', 1.0);

    const pdf = new jsPDF();

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    pdf.save(`${name.replace(' ', '')}-resume.pdf`);
  });
}

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
          <img className="download-logo" width='20px' onClick={() => downloadResumePDF(allFormValues.personalDetailsForm[0] ? allFormValues.personalDetailsForm[0].values[0] : personalDetails[0].placeholder)} src={downloadIcon} alt="download as PDF" />
          <ResumeDisplay allFormValues={allFormValues} allPlaceholders={{personalDetails, educationDetails, experienceDetails}}/>
        </section>
      </main>
    </>
  );
}

export default App;
