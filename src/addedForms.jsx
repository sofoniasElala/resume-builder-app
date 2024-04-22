export default function AddedForms({savedValues, updateCurrentValue, visible}){

    function editMode(element, value){
       // const inputsFilled = inputElements([...value.toReversed()]);
        console.log(value)
        updateCurrentValue(value.id, [...value.values.toReversed()]);
        visible();
    }
    return savedValues.map((value) => {
        return <div key={value.values[0]} onClick={(e) => editMode(e, value)} className="tab">{value.values[0]}</div>
    });
}