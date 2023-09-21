import NoteData from "../noteData";
import { useState, useEffect, useRef } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
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
  notesList,
  content,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    updateNoteContent(selectedNote?.id, newContent);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setNoteTitle(newTitle);
    updateNoteTitle(selectedNote?.id, newTitle);
  };

  const toggleEdit = () => {
    setIsEditable(true);
  };

  const handleBlur = () => {
    setIsEditable(false);
  };

  useEffect(() => {
    if (notesList.length === 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [notesList]);

  return (
    <>
      {open ? (
        <div className="h-screen w-full flex items-center justify-center flex-col">
          <h1 className="text-xl mb-2 text-center">No Note Selected</h1>
          <h1 className="text-xl mb-2 text-center">
            Select / Create a note to get started!
          </h1>
        </div>
      ) : (
        <div className="w-screen">
          <div className="border border-b-gray-200 w-full p-5 flex items-center justify-between">
            <ContentEditable
              html={selectedNote?.title ? selectedNote.title : ""}
              disabled={false}
              onChange={handleTitleChange}
              onBlur={handleBlur}
              onDoubleClick={toggleEdit}
              className={
                rotate
                  ? "text-black md:text-[32px] text-[20px] pl-20 font-semibold focus:outline-none w-full"
                  : "text-black md:text-[32px] text-[20px] px-6 font-semibold focus:outline-none w-full"
              }
            />

            <button
              className="border-2 border-black shadow-button py-2 px-5 text-sm rounded-full hover:shadow-none hover:bg-red-500 hover:text-white hover:border-none"
              onClick={() => deleteNote(selectedNote?.id)}
            >
              Delete
            </button>
          </div>
          <ContentEditable
            html={selectedNote?.content ? selectedNote.content : ""}
            disabled={false}
            onChange={handleChange}
            className="md:p-12 p-8 focus:border-none focus:outline-none "
          />
        </div>
      )}
    </>
  );
};

export default Note;
