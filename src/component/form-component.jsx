import React from 'react'

const FormComponent = ({ children, action, onSaveClick }) => (
    <div>
        <form action={action} onSubmit={onSaveClick}>
            {children}
            <button onClick={onSaveClick}>Search</button>
        </form>
    </div>
)

export default FormComponent
