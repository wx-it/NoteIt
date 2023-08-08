import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import SideBar from "../components/SideBar";
import Note from "../components/Note";
import OpenSidebar from "../components/openSidebar";
import NoteData from "../noteData";

const Dashboard = () => {
  const [notesList, setNotesList] = useState<NoteData[]>([]);
  const [rotate, setRotate] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteData | null>(null);

  const notesCollection = collection(db, "notes");

  const handleSelectNote = (note: NoteData) => {
    localStorage.setItem("selectedNoteId", note.id);
    setSelectedNote(note);
  };

  useEffect(() => {
    const getNotesList = async () => {
      try {
        const data = await getDocs(notesCollection);
        const filteredData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as NoteData[];
        setNotesList(filteredData);
        //console.log(notesList)
      } catch (err) {
        console.error(err);
      }
    };
    getNotesList();

    const selectedNoteId = localStorage.getItem("selectedNoteId");
    if (selectedNoteId) {
      const storedNote = notesList.find((note) => note.id === selectedNoteId);
      if (storedNote) {
        setSelectedNote(storedNote);
      }
    }
  }, [notesList, notesCollection]);

  return (
    <div className="flex w-full h-screen">
      {rotate && <OpenSidebar rotate={rotate} setRotate={setRotate} />}
      <SideBar
        notesList={notesList}
        rotate={rotate}
        setRotate={setRotate}
        onSelectNote={handleSelectNote}
      />
      <Note selectedNote={selectedNote} />
    </div>
  );
};

export default Dashboard;
