import React from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import { data } from './data';
import Split from 'react-split';
import { nanoid } from 'nanoid';

export default function App() {
  /**
   * Challenge:
   * 1. Every time the `notes` array changes, save it
   *    in localStorage. You'll need to use JSON.stringify()
   *    to turn the array into a string to save in localStorage.
   * 2. When the app first loads, initialize the notes state
   *    with the notes saved in localStorage. You'll need to
   *    use JSON.parse() to turn the stringified array back
   *    into a real JS array.
   */

  /**
   * Challenge:
   * Lazily initialize our `notes` state so it doesn't
   * reach into localStorage on every single re-render
   * of the App component
   */

/**
     * Challenge: complete and implement the deleteNote function
     * 
     * Hints: 
     * 1. What array method can be used to return a new
     *    array that has filtered out an item based 
     *    on a condition?
     * 2. Notice the parameters being based to the function
     *    and think about how both of those parameters
     *    can be passed in during the onClick event handler
  */

  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem('notes')) || []
  );
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ''
  );

  React.useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    // -> modified note always at top
    setNotes(oldNotes => {
      const newArray = []
      for(let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i]
        if(oldNotes[i].id === currentNoteId) {
          newArray.unshift({...oldNote, body: text})
        } else {
          newArray.push(oldNote)
        }
      }
      return newArray
    })

    // -> This does not rearrange the notes once edited
    // setNotes((oldNotes) =>
    //   oldNotes.map((oldNote) => {
    //     return oldNote.id === currentNoteId
    //       ? { ...oldNote, body: text }
    //       : oldNote;
    //   })
    // );
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes(oldNotes => oldNotes.filter(note => 
    note.id !== noteId))
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            newNote={createNewNote}
            setCurrentNoteId={setCurrentNoteId}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor 
            currentNote={findCurrentNote()} 
            updateNote={updateNote} 
            />
          )}
        </Split>
      ) : (
        <div className="no__notes">
          <h1>You have no notes</h1>
          <button className="first__note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
