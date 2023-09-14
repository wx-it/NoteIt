import NoteData from "../noteData";
import { useState } from "react";
interface NoteContentProps {
  selectedNote: NoteData | null;
}

const Note: React.FC<NoteContentProps> = ({ selectedNote }) => {
  const [noteContent, setNoteContent] = useState<string>("");

  const handleNoteChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setNoteContent(e.target.textContent || "");
  };

  return (
    <div className="w-screen">
      <div className="border border-b-gray-200 w-full p-5">
        <h2 className="text-black text-[32px] font-semibold capitalize">
          {selectedNote?.title}
        </h2>
      </div>
      <div
        onInput={handleNoteChange}
        dangerouslySetInnerHTML={{ __html: selectedNote?.content }}
        contentEditable="true"
        className="p-12 focus:border-none focus:outline-none "
      ></div>
    </div>
  );
};

export default Note;
