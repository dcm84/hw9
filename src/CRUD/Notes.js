import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes
} from 'react-router-dom';
import NotesList from './NotesList.js';
import './Notes.css';
import NoteAdd from './NoteAdd.js';
import Note from './Note.js';

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        };
    }

    //обработчик для добавления
    handleAdd = content => {
        console.log("sending to new note: " + content);
        fetch(process.env.REACT_APP_API_URL, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: 0,
                content: content
            })
        })
            .then(() => this.updateNotes())
    }

    //обработчик для удаления
    handleRemove = id => {
        console.log("deleting note with id=" + id);
        fetch(process.env.REACT_APP_API_URL + '/' + id, {
            method: "DELETE"
        })
            .then(() => this.updateNotes());
    }

    //обработчик для редактирования
    handleEdit = (id, content) => {
        console.log("edit note with id=" + id);
        fetch(process.env.REACT_APP_API_URL, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                content: content
            })
        })
            .then(() => this.updateNotes())
    }

    //загружает данные через API
    updateNotes = () => {
        console.log("updating data from " + process.env.REACT_APP_API_URL);
        fetch(process.env.REACT_APP_API_URL)
            .then(response => {
                return response.json()
            })
            .then(notes => {
                this.setState({ notes: notes });
            });
    }

    //предварительная загрузка данных
    componentDidMount() {
        this.updateNotes();
    }

    render() {
        return (
            <Router>
                <div className="notes">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <h2>
                                <Link to="/new" className="new_note"><img src="add.png" />Новый пост</Link>
                                    Посты <img src="reload.png" onClick={this.updateNotes} /></h2>
                                <NotesList notes={this.state.notes} onRemove={this.handleRemove} />
                            </>
                        } />
                        <Route path="/new" element={<NoteAdd onAdd={this.handleAdd} />} />
                        <Route path="/posts/:id" element={<Note onRemove={this.handleRemove} onEdit={this.handleEdit} notes={this.state.notes} />} />
                    </Routes>
                </div>
            </Router>
        )
    }
}

export default Notes;