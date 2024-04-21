import CreateForm from "./CreateForm";
import { personalDetails, educationDetails, experienceDetails } from "./formInputData";
import './App.css';

function App() {
  return (
    <>
      <main>
        <div className="forms">
          <CreateForm inputData={[personalDetails, "Personal Details"]} />
          <CreateForm inputData={[educationDetails, "Education"]} />
          <CreateForm inputData={[experienceDetails, "Experience"]} />
        </div>
        <section></section>
      </main>
    </>
  );
}

export default App;
