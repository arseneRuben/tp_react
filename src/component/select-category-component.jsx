import React from 'react'

function renderOptions (options) {
    console.log('renderOptions')
    const resultat = options.map((option, index) => {
        return <option key={index} value={index}>  {option.label}  </option>
    })

    return resultat
}
const SelectCategoryComponent = ({ id, name, label, options }) => (
    <div>
        <label htmlFor={id}>{label}</label>
        <select id={id} name={name}>
            {renderOptions(options)}
        </select>
    </div>

)

export default SelectCategoryComponent
