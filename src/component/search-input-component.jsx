
import React from 'react'

const SearchInputComponent = ({ type, id, name, label }) => (

    <input className='form-control  mr-sm-2' type={type} id={id} name={name} placeholder={label} />

)

export default SearchInputComponent
