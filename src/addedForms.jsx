export default function AddedForms({savedValues, updateCurrentValue, inputElements, visible}){

    function editMode(element, value){
        const inputsFilled = inputElements([...value.toReversed()]);
        console.log(value)
        updateCurrentValue(inputsFilled);
        visible();
    }
    return savedValues.map((value) => {
        return <div key={value[0]} onClick={(e) => editMode(e, value)} className="tab">{value[0]}</div>
    });
}