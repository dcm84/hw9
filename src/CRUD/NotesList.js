import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';

function NotesList(props) {
    const { notes, onRemove } = props;

    return (
        notes.length > 0 &&
        notes.map(o =>
            <div key={o.id}>
                <img src="delete.png" onClick={() => onRemove(o.id)} />
                {o.content}
                <p><Link to={"/posts/" + o.id}>подробнее...</Link></p>
            </div>
        )
    )
}

NotesList.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            content: PropTypes.string
        })
    ),
    onRemove: PropTypes.func.isRequired
}

export default NotesList;