import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

function NoteAdd(props) {
    const navigate = useNavigate();
    const { onAdd } = props;
    const [form, setForm] = useState({ content: "не забыть выспаться!" });

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
            onAdd(form.content);
        }

        //установим форму в начальное состояние
        setForm({ content: "" });
        navigate("/");
    }

    return (
        <>
            <h3>Новое сообщение</h3>
            <div className="newMessage">
                <form>
                    <img src="add.png" onClick={handleSubmit} />
                    <textarea name="content" value={form.content} onChange={handleChange} />
                </form>
            </div>
        </>
    );
}

NoteAdd.propTypes = {
    onAdd: PropTypes.func.isRequired
}

export default NoteAdd;