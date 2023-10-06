import NoteData from "../noteData";
import { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { Editor } from "novel";
import { JSONContent } from "@tiptap/react";
import trash2 from "react-useanimations/lib/trash2";
import UseAnimations from "react-useanimations";
import React from "react";

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
  deleteNote,
  updateNoteTitle,
  updateNoteContent,
  notesList,
  editorKey,
  setSelectedNote,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [open, setOpen] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    updateNoteTitle(selectedNote?.id, newTitle);
  };

  const toggleEdit = () => {
    setIsEditable(true);
  };

  const handleBlur = () => {
    setIsEditable(false);
  };

  useEffect(() => {
    // if (
    //   notesList.length === 0 ||
    //   (notesList.length === 0 && selectedNote === null)
    // ) {
    //   setOpen(true);
    // } else 
    if (!selectedNote) {
      console.log(selectedNote);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [notesList, selectedNote]);

  const currentDate = new Date(selectedNote?.createdAt).toDateString();
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
                deleteNote(selectedNote?.id);
              }}
            >
              {/* <UseAnimations animation={trash2} strokeColor="#464646" /> */}
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
            onBlur={handleBlur}
            onDoubleClick={toggleEdit}
            className="text-black md:text-[32px] text-[20px] mx-8 md:mx-12 font-bold focus:outline-none"
          />
          <span className="mx-8 md:mx-12 text-xs">{currentDate}</span>

          <Editor
            className="shadow-none w-full text-[#1B1B1B]"
            defaultValue={selectedNote?.content ? selectedNote.content : ""}
            key={editorKey}
            onUpdate={(editor) => {
              const newContent = editor?.getJSON();
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
