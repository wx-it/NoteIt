import NoteData from "../noteData";
import { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { Editor } from "novel";
import { JSONContent } from "@tiptap/react";
import trash2 from "react-useanimations/lib/trash2";
import UseAnimations from "react-useanimations";
import React from 'react';

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

  const currentDate = new Date(selectedNote?.createdAt).toDateString()
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
              onClick={() => { deleteNote(selectedNote?.id); setSelectedNote(notesList[0])}}
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
