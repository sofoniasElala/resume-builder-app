export default function AddedForms({savedValues, updateCurrentValue, deleteForm}){

    function editMode(element, value){
       // const inputsFilled = inputElements([...value.toReversed()]);
        console.log(value)
        updateCurrentValue(value.id, [...value.values.toReversed()]);
    }

    function deleteCurrentForm(e,id){
        e.stopPropagation();
        deleteForm(id)
    }
    return savedValues.map((value) => {
        return <div key={value.values[0]} onClick={(e) => editMode(e, value)} className="tab">{value.values[0]}<button onClick={(e) => deleteCurrentForm(e, value.id)} >D</button></div>
    });
}