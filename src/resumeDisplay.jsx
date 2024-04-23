import { Fragment } from "react";
import "./resumeDisplay.css";

function getAddedFormsInElements(values, placeholder=[], id=null){
    return (
        <div key={id? id :placeholder[0]} className="form-instance">
          <div className="form-title">
            <span className="company-or-school-location">
              {(values[0] ? values[0] : placeholder[0] + '*') + ", " + '\u00A0\u00A0' + (values[4] ? values[4] : placeholder[4] + '*')}
            </span>
            <span className="secondary">{"\u00A0\u00A0 - \u00A0\u00A0" + (values[1] ? values[1] : placeholder[1] + '*')}</span>
          </div>
          <div className="date">
            {(values[2] ? values[2] : placeholder[2] + '*') + " - " + (values[3] ? values[3] : placeholder[3] + '*')}
          </div>
          {<p className="textarea">{values[5] ? values[5] : placeholder[5]}</p>}
        </div>
      );
}

function getAddedForms(actualValues, placeholders) {
    const placeholderNames = placeholders.map(holder => holder.name);
  if (actualValues.length > 0) {
    return actualValues.map((form) =>  getAddedFormsInElements(form.values, placeholderNames, form.id));
  } else {
    return getAddedFormsInElements([null], placeholderNames);
  }
}

function getPersonalDetailsValues(personalDetailsForm, personalDetailsPlaceholder, index){
    if(personalDetailsForm.length > 0){
        if (personalDetailsForm[0].values[index].length > 0) return personalDetailsForm[0].values[index];
    } 
    return personalDetailsPlaceholder[index].name + '*';
    
}

export default function ResumeDisplay({ allFormValues, allPlaceholders }) {
  return (
    <Fragment key={'Fragment'}>
      <p  className="personal">{getPersonalDetailsValues(allFormValues.personalDetailsForm, allPlaceholders.personalDetails, 3)}</p>
      <p className="personal">{getPersonalDetailsValues(allFormValues.personalDetailsForm, allPlaceholders.personalDetails, 2)}</p>
      <p  className="personal">{getPersonalDetailsValues(allFormValues.personalDetailsForm, allPlaceholders.personalDetails, 1)}</p>
      <h1>{getPersonalDetailsValues(allFormValues.personalDetailsForm, allPlaceholders.personalDetails, 0)}</h1>
      <hr />
      <h3>EXPERIENCE</h3>
      {getAddedForms(
        allFormValues.experienceDetailsForm,
        allPlaceholders.experienceDetails
      )}
      <h3>EDUCATION</h3>
      {getAddedForms(
        allFormValues.educationDetailsForm,
        allPlaceholders.educationDetails
      )}
    </Fragment>
  );
}
