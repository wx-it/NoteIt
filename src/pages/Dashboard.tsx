import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const Dashboard = () => {
  const [notesList, setNotesList] = useState([]);

  const notesCollection = collection(db, "Notes");

  useEffect(() => {
    const getNotesList = async () => {
      try {
        const data = await getDocs(notesCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        console.log(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getNotesList();
  }, [notesCollection]);

  return <div>Dashboard</div>;
};

export default Dashboard;
