import PropTypes from 'prop-types';
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function Note(props) {
    const navigate = useNavigate();
    const {onRemove, onEdit, notes} = props;
    
    const [editMode, setEditMode] = useState(false);
    const handleView = () => {
        setEditMode(prev => (!prev));
    }

    let params = useParams();
    let currentNote = notes.filter(
        note => note.id == params.id
      );
    const [form, setForm] = useState({id: 0, content: ""});

    useEffect(() => { 
        let currentNote = notes.filter(
            note => note.id == params.id
          );
          setForm({id: currentNote[0].id, content: currentNote[0].content});
    }
    , []);


    //обработчик изменения состояния полей формы
    const handleChange = evt => {
        const { name, value } = evt.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    }

    //обработчик отправки формы
    const handleSubmit = evt => {
        evt.preventDefault();

        //сообщения менее 3 символов не будем отправлять
        if (form.content.length > 3) {
            onEdit(form.id, form.content);
        }

         navigate("/");
    }

    return (
        <>
            <h3>Просмотр сообщения <img src="../back.png" onClick={() => {navigate("/")}} /></h3>
            {
            !editMode &&
            <div>
                <img src="../delete.png" onClick={() => {onRemove(form.id); navigate("/");}} />
                {form.content}
                <p onClick={handleView}><img src="../edit.png" /> Редактировать</p>
            </div>
            }
            {
            editMode && 
            <>
            <p><img src="../back.png" onClick={handleView} /> вернуться к просмотру сообщения</p>
            <div className="newMessage">
                
                <form>
                    <img src="../save.png" onClick={handleSubmit} />
                    <input type="hidden" name="id" value={form.id} />
                    <textarea name="content" value={form.content} onChange={handleChange} />
                </form>
            </div>
            </>
            }
        </>
    );
}

Note.propTypes = {
    onRemove: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            content: PropTypes.string.isRequired,
            created: PropTypes.number
        })
    )
}

export default Note;