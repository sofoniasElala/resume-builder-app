export default function CreateForm({inputData}) {
    const formHeader = inputData[1];
  return (
    <>
      <form action="" className={formHeader}> 
      <h2>{formHeader}</h2>
        {inputData[0].map(input => {
            return <label key={input.name} >{input.name} <input placeholder={input.placeholder} type={input.type} /></label>
        })}
      {formHeader !== 'Personal Details' ? <button>Save</button> : null}
      </form>
    </>
  );
}
