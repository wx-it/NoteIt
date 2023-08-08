
const Note = ({notesList}) => {
  return (
    <div>
      {notesList.map(note =>(
        <div key={note.id} >
          <h2> {note.title} </h2>
          <p> {note.content} </p>
        </div>
      ))}
    </div>
  )
}

export default Note