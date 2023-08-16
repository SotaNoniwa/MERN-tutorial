import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Editor() {
    // Get the route parameter :id from the request URL
    const { id } = useParams();

    // Keep the original note as state
    const [originalNote, setOriginalNote] = useState({
        title: "",
        content: ""
    });

    // Hold the edited note as state
    const [editedNote, setEditedNote] = useState({
        title: "",
        content: ""
    });

    // Check if the note is edited or not
    const [isEdited, setIsEdited] = useState(false);

    // Fetch data when route param :id changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Send GET request to the server with id
                const res = await axios.get(process.env.REACT_APP_API_BASE_URL + id);

                const { title, content } = res.data;

                setOriginalNote({ title, content });
                setEditedNote({ title, content });
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, [id]);

    function handleOnChange(event) {
        // Destructure name and value in input element
        const { name, value } = event.target;

        setEditedNote((prevNote) => ({
            ...prevNote,
            [name]: value
        }));

        setIsEdited(true);
    }

    return <div>
        <h1>Edit a Note</h1>
        <input
            type="text"
            name="title"
            value={editedNote.title}
            onChange={handleOnChange}
        />
        <input
            type="textArea"
            name="content"
            value={editedNote.content}
            onChange={handleOnChange}
        />
        {isEdited && <p>The note is under editing</p>}
    </div>
}

export default Editor;