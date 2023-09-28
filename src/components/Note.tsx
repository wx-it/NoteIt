import NoteData from "../noteData";
import { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { Editor } from "novel";
import { JSONContent } from "@tiptap/react";

interface NoteContentProps {
  selectedNote: NoteData | null;
  rotate: boolean;
  setNoteTitle: (newTitle: string) => void;
  deleteNote: (id: string | undefined) => void;
  updateNoteTitle: (id: string | undefined, newTitle: string) => void;
  updateNoteContent: (
    id: string | undefined,
    newContent: JSONContent | undefined
  ) => void;
  notesList: NoteData;
  editorKey: number;
}

const Note: React.FC<NoteContentProps> = ({
  selectedNote,
  rotate,
  setNoteTitle,
  deleteNote,
  updateNoteTitle,
  updateNoteContent,
  notesList,
  editorKey,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [open, setOpen] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    if (
      notesList.length === 0 ||
      selectedNote === null ||
      (notesList.length === 0 && selectedNote === null)
    ) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [notesList, selectedNote]);

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
        <div className="w-full">
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

          <Editor
            className="shadow-none w-full"
            defaultValue={selectedNote?.content ? selectedNote.content : ""}
            key={editorKey}
            onUpdate={(editor) => {
              const newContent = editor?.getJSON();
              console.log(newContent);
              if (selectedNote) {
                updateNoteContent(selectedNote?.id, newContent);
              }
            }}
            disableLocalStorage={true}
          />
        </div>
      )}
    </>
  );
};

export default Note;
