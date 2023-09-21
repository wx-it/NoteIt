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
  const [html, setHtml] = useState(selectedNote?.content);
  // const contentEditable = useRef<ContentEditable>(selectedNote?.content);

  const handleChange = (e) => {
    //setHtml(e.target.value);
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
            {/* <h2
              onInput={(e) => {
                const newTitle = e.target.textContent;
                setNoteTitle(newTitle);
                updateNoteTitle(selectedNote?.id, newTitle);
              }}
              // onChange={() => updateNoteTitle(selectedNote?.id)}
              dangerouslySetInnerHTML={{ __html: selectedNote?.title }}
              onBlur={handleBlur}
              onClick={toggleEdit}
              contentEditable={isEditable}
              className={
                rotate
                  ? "text-black md:text-[32px] text-[20px] pl-20 font-semibold capitalize focus:outline-none"
                  : "text-black md:text-[32px] text-[20px] px-8 font-semibold capitalize focus:outline-none"
              }
            ></h2> */}

            <ContentEditable
              html={selectedNote?.title ? selectedNote.title : ""}
              disabled={false}
              onChange={handleTitleChange}
              className={
                rotate
                  ? "text-black md:text-[32px] text-[20px] pl-20 font-semibold capitalize focus:outline-none w-full"
                  : "text-black md:text-[32px] text-[20px] px-6 font-semibold capitalize focus:outline-none w-full"
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
