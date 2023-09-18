import NoteData from "../noteData";
import { useState, useEffect } from "react";
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
  notesList
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [open, setOpen] = useState(false)

  const toggleEdit = () => {
    setIsEditable(true);
  };

  const handleBlur = () => {
    setIsEditable(false);
  };

useEffect(()=>{
  if(notesList.length === 0){
    setOpen(true)
  }else{
    setOpen(false)
  }
  console.log(notesList.length)

},[notesList])

  return (
    <>
    {
      open ? (
        <div className="h-screen w-full flex items-center justify-center flex-col" >
          <h1 className="text-xl mb-2 text-center">No Note Selected</h1>
          <h1 className="text-xl mb-2 text-center">Select / Create a note to get started!</h1>
        </div>
             ): (
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
        
                <button className="border-2 border-black shadow-button py-2 px-5 text-sm rounded-full hover:shadow-none hover:bg-red-500 hover:text-white hover:border-none" onClick={() => deleteNote(selectedNote?.id)}> Delete </button>
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
      
             )
    }
    </>
  );
};

export default Note;
