import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import SideBar from "../components/SideBar";
import Note from "../components/Note";

const Dashboard = () => {
  const [notesList, setNotesList] = useState([]);
  console.log(
    notesList.map((n) =>
      n.folder.map((note) => (
        <div>
          <p>{note.title}</p> <p>{note.content}</p>
        </div>
      ))
    )
  );

  const notesCollection = collection(db, "Notes");

  useEffect(() => {
    const getNotesList = async () => {
      try {
        const data = await getDocs(notesCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        setNotesList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getNotesList();
  }, []);

  return (
    <div className="flex w-full h-screen" >
      <SideBar notesList={notesList} />
      <Note notesList={notesList} />
    </div>
  );
};

export default Dashboard;
