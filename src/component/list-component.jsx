import React from 'react'

function renderLi (item, onItemAddClick, onItemDeleteClick) {
    return (
        <li key={item.id} id={item.id}>
            <span onClick={onItemAddClick}>
                {item.userName}
            </span>
            <button onClick={onItemDeleteClick}>X</button>
        </li>
    )
}

const ListComponent = ({ items, onItemAddClick, onItemDeleteClick }) => (
    <div>
        <ul>
            {items.map((item) => renderLi(item, onItemAddClick, onItemDeleteClick))}
        </ul>

    </div>
)

export default ListComponent
