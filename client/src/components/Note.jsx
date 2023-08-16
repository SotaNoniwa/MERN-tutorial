import React from "react";
import axios from "axios";

function Note(props) {

  async function deleteNote() {
    try {
      // Make DELETE request to the server
      await axios.delete(process.env.REACT_APP_API_BASE_URL + props.id);

      props.setNotes((prevNotes) =>
        prevNotes.filter((note) =>
          note._id !== props.id)
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={deleteNote}>DELETE</button>
    </div>
  );
}

export default Note;
