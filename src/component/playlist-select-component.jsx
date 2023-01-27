import React from 'react'

function renderOptions (options) {
    const resultat = options.map((option, index) => {
        return <option className='navbar-nav mr-auto' key={index} value={index}>  {option.title}  </option>
    })

    return resultat
}

const PlayListSelectComponent = ({ options, onChange }) => (
    <div className='collapse navbar-collapse'>

        <select className='custom-select' name='categorie' id='categorie' onChange={onChange}>
            {renderOptions(options)}
        </select>
    </div>

)

export default PlayListSelectComponent
