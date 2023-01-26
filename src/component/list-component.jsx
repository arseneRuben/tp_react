import React from 'react'

function renderLi (item, onItemReadClick, onItemToggleClick) {
    return (
        <li key={item.id} class='list-group-item'>

            <i className='fa fa-plus' onClick={onItemToggleClick} aria-hidden='true' />

            <span id={item.master_id} onClick={onItemReadClick}>
                {item.title}
            </span>

        </li>
    )
}

const ListComponent = ({ items, onItemReadClick, onItemToggleClick }) => (
    <div>
        {items.length > 0
            ? <ul className='list-group'> {items.map((item) => renderLi(item, onItemReadClick, onItemToggleClick))} </ul>
            : <h2> pas de resultats</h2>}
    </div>
)

export default ListComponent
