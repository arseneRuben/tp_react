import React from 'react'

function renderLi (item, index, onItemReadClick, onItemToggleClick) {
    return (
        <li key={index} className='list-group-item'>

            <i className='fa fa-plus' id={item.id} onClick={onItemToggleClick} aria-hidden='true' />

            <span id={item.master_id} data-index={index} onClick={onItemReadClick}>
                {item.title}
            </span>

        </li>
    )
}

const ListComponent = ({ items, onItemReadClick, onItemToggleClick }) => (
    <div>
        {items.length > 0
            ? <ul className='list-group'> {items.map((item, index) => renderLi(item, index, onItemReadClick, onItemToggleClick))} </ul>
            : <h2> pas de resultats</h2>}
    </div>
)

export default ListComponent
