import NoteData from "../noteData";
import { useState } from "react";
interface NoteContentProps {
  selectedNote: NoteData | null;
}

const Note: React.FC<NoteContentProps> = ({ selectedNote, rotate }) => {
  const [noteTitle, setNoteTitle] = useState<string>("");

  const handleNoteChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setNoteTitle(e.target.textContent || "");
    console.log(noteTitle);
  };

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
          onInput={handleNoteChange}
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
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: selectedNote?.content }}
        contentEditable="true"
        className="md:p-12 p-8 focus:border-none focus:outline-none "
      ></div>
    </div>
  );
};

export default Note;
