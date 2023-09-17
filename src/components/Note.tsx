import NoteData from "../noteData";
import { useState } from "react";
interface NoteContentProps {
  selectedNote: NoteData | null;
}

const Note: React.FC<NoteContentProps> = ({
  selectedNote,
  rotate,
  setNoteTitle,
  setContent,
  deleteNote,
}) => {
  const [isEditable, setIsEditable] = useState(false);

  const toggleEdit = () => {
    setIsEditable(true);
  };

  const handleBlur = () => {
    setIsEditable(false);
  };

  return (
    <div className="w-screen">
      <div className="border border-b-gray-200 w-full p-5">
        <h2
          onInput={(e) => setNoteTitle(e.target.textContent || "")}
          dangerouslySetInnerHTML={{ __html: selectedNote?.title }}
          onBlur={handleBlur}
          onDoubleClick={toggleEdit}
          contentEditable={isEditable}
          className={
            rotate
              ? "text-black text-[32px] pl-20 font-semibold capitalize focus:outline-none"
              : "text-black text-[32px] px-8 font-semibold capitalize focus:outline-none"
          }
        ></h2>

        <button onClick={() => deleteNote(selectedNote?.id)}>delete</button>
      </div>
      <div
        onInput={(e) => setContent(e.target.textContent || "")}
        dangerouslySetInnerHTML={{ __html: selectedNote?.content }}
        contentEditable="true"
        className="md:p-12 p-8 focus:border-none focus:outline-none "
      ></div>
    </div>
  );
};

export default Note;
