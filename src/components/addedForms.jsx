import trashIcon from '../assets/trash-solid.svg'
export default function AddedForms({resume, updateCurrentValue, deleteForm}){

    function editMode(value){
        updateCurrentValue(value.id, [...value.values.toReversed()]);
    }

    function deleteCurrentForm(e,id){
        e.stopPropagation();
        deleteForm(id)
    }
    return resume.map((value) => {
    return <div key={value.values[0]} onClick={() => editMode(value)} className="tab">{value.values[0]}<button width='15px' onClick={(e) => deleteCurrentForm(e, value.id)} ><img width='15px' src={trashIcon} alt="delete" /></button></div>
    });
}