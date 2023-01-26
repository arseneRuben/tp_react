
import React from 'react'

const SearchInputComponent = ({ type, id, name, label, onChange, value }) => (

    <input className='form-control  mr-sm-2' type={type} id={id} name={name} placeholder={label} onChange={onChange} value={value} />

)

export default SearchInputComponent
