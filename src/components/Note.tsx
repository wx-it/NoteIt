import NoteData from "../noteData";
import { useState } from "react";
import {AiOutlineDelete} from "react-icons/ai"
interface NoteContentProps {
  selectedNote: NoteData | null;
}

const Note: React.FC<NoteContentProps> = ({
  selectedNote,
  rotate,
  setNoteTitle,
  setContent,
  deleteNote,
  updateNoteTitle,
  updateNoteContent,
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
      <div className="border border-b-gray-200 w-full p-5 flex items-center justify-between">
        <h2
          onInput={(e) => {
            const newTitle= e.target.textContent
            setNoteTitle(newTitle);
            updateNoteTitle(selectedNote?.id, newTitle)
          }}
         // onChange={() => updateNoteTitle(selectedNote?.id)}
          dangerouslySetInnerHTML={{ __html: selectedNote?.title }}
          onBlur={ handleBlur }
          onClick={toggleEdit}
          contentEditable={isEditable}
          className={
            rotate
              ? "text-black md:text-[32px] text-[20px] pl-20 font-semibold capitalize focus:outline-none"
              : "text-black md:text-[32px] text-[20px] px-8 font-semibold capitalize focus:outline-none"
          }
        ></h2>

        <button onClick={() => deleteNote(selectedNote?.id)}> <AiOutlineDelete/> </button>
      </div>
      <div
        onInput={(e) => {
          const newContent= e.target.textContent;
          setContent(newContent);
          updateNoteContent(selectedNote?.id, newContent);
        }}
        dangerouslySetInnerHTML={{ __html: selectedNote?.content }}
        contentEditable="true"
        className="md:p-12 p-8 focus:border-none focus:outline-none "
      ></div>
    </div>
  );
};

export default Note;
