import NoteData from "../noteData";
interface NoteContentProps {
  selectedNote: NoteData  | null;
}

const Note:  React.FC<NoteContentProps> = ({selectedNote}) => {
  return (
    <div>
      <h2>{selectedNote?.title}</h2>
      <p>{selectedNote?.content}</p>
    </div>
  );
}

export default Note