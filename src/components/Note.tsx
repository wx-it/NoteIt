import NoteData from "../noteData";
import { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { Editor } from "novel";
import { JSONContent } from "@tiptap/react";
import { ContentEditableEvent } from "react-contenteditable";

interface NoteContentProps {
  selectedNote: NoteData | null;
  rotate: boolean;
  deleteNote: (id: string) => void;
  updateNoteTitle: (id: string, newTitle: string) => void;
  updateNoteContent: (
    id: string,
    newContent: JSONContent
  ) => Promise<void>;
  notesList: NoteData[];
  editorKey: number;
}

const Note: React.FC<NoteContentProps> = ({
  selectedNote,
  deleteNote,
  updateNoteTitle,
  updateNoteContent,
  notesList,
  editorKey,
}) => {
  const [open, setOpen] = useState(false);

  const handleTitleChange = (e: ContentEditableEvent) => {
    const newTitle = e.target.value;
    if (selectedNote?.id) {
      updateNoteTitle(selectedNote.id, newTitle);
    }
  };

  useEffect(() => {
    if (!selectedNote) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [notesList, selectedNote]);

  let currentDate = "";
  if (selectedNote?.createdAt) {
    currentDate = new Date(selectedNote.createdAt).toDateString();
  }

  let currentId: string;
  if (selectedNote?.id) {
    currentId = selectedNote.id;
  }

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
        <div className="w-full bg-[#f4f4f4] h-screen ">
          <div className=" w-full p-5 flex items-center justify-end">
            <button
              className="border border-[#464646] p-2  text-sm rounded-md"
              onClick={() => {
                deleteNote(currentId);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="22"
                id="trash"
              >
                <g
                  fill="none"
                  fillRule="evenodd"
                  stroke="#464646"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M1 5h18M17 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5m3 0V3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M8 10v6M12 10v6"></path>
                </g>
              </svg>
            </button>
          </div>
          <ContentEditable
            html={selectedNote?.title ? selectedNote.title : ""}
            disabled={false}
            onChange={handleTitleChange}
            className="text-black md:text-[32px] text-[20px] mx-8 md:mx-12 font-bold focus:outline-none"
          />
          <span className="mx-8 md:mx-12 text-xs">{currentDate}</span>

          <Editor
            className="shadow-none w-full text-[#1B1B1B]"
            defaultValue={selectedNote?.content ? selectedNote.content : ""}
            key={editorKey}
            onUpdate={(editor) => {
              const newContent = editor?.getJSON();
              if (selectedNote && newContent) {
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
