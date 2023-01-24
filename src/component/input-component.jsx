
import React from 'react'

const InputComponent = ({ text, type, id, name, label }) => (
    <div>
        <input type={type} id={id} name={name} placeholder={label} />
    </div>
)

export default InputComponent
