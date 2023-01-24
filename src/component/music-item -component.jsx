import React from 'react'

function renderLi (content, index) {
    return <li key={index}><strong>{content.userName}</strong> {content.firstName} {content.lastName}<button>X</button></li>
}
const MusicItemComponent = ({ contents, onClickShowForm }) => (
    <div><ul>{contents.map((content, index) => renderLi(content, index))}</ul></div>
)

export default MusicItemComponent
