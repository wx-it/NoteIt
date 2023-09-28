import NoteData from "../noteData";
import { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { Editor } from "novel";
import { JSONContent } from "@tiptap/react";
import trash2 from "react-useanimations/lib/trash2";
import UseAnimations from "react-useanimations";

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
          <div className=" w-full p-5 flex items-center justify-end">
            <button
              className="border border-[#464646] p-2  text-sm rounded-md"
              onClick={() => deleteNote(selectedNote?.id)}
            >
              <UseAnimations animation={trash2} strokeColor="#464646" />
            </button>
          </div>
          <ContentEditable
            html={selectedNote?.title ? selectedNote.title : ""}
            disabled={false}
            onChange={handleTitleChange}
            onBlur={handleBlur}
            onDoubleClick={toggleEdit}
            className="text-black md:text-[32px] text-[20px] mx-8 md:mx-12 font-bold focus:outline-none"
          />
          <span className="mx-8 md:mx-12 text-xs">September 28, 2023</span>

          <Editor
            className="shadow-none w-full text-[#1B1B1B]"
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
