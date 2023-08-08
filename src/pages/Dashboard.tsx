import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import SideBar from "../components/SideBar";
import Note from "../components/Note";

const Dashboard = () => {
  const [notesList, setNotesList] = useState([]);
  const notesCollection = collection(db, "notes");

  useEffect(() => {
    const getNotesList = async () => {
      try {
        const data = await getDocs(notesCollection);
        const filteredData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotesList(filteredData);
        //console.log(notesList)
      } catch (err) {
        console.error(err);
      }
    };
    getNotesList();
  }, []);

  return (
    <div className="flex w-full h-screen">
      <SideBar notesList={notesList} />
      <Note notesList={notesList} />
    </div>
  );
};

export default Dashboard;
