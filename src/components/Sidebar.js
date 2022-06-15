import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


export default function Sidebar(props) {
  /**
     * Challenge: Try to figure out a way to display only the 
     * first line of note.body as the note summary in the
     * sidebar.
     * 
     * Hint 1: note.body has "invisible" newline characters
     * in the text every time there's a new line shown. E.g.
     * the text in Note 1 is:
     * "# Note summary\n\nBeginning of the note"
     * 
     * Hint 2: See if you can split the string into an array
     * using the "\n" newline character as the divider
     */

  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? 'selected__note' : ''
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className="text__snippets"># {note.body.split('\n')[0]}</h4>
        <button 
        className='delete__btn'
        onClick={(event) => props.deleteNote(event, note.id)}
        >
          <FontAwesomeIcon icon={faTrashCan}/>
        </button>
      </div>
    </div>
  ));
  return (
    <section className="pane sidebar">
      <div className="sidebar__header">
        <h3>Notes</h3>
        <button className="new__note" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}
