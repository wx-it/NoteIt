import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import SideBar from "../components/SideBar";
import Note from "../components/Note";
import OpenSidebar from "../components/openSidebar";
import NoteData from "../noteData";
import { auth } from "../config/firebase";

const Dashboard = () => {
  const [notesList, setNotesList] = useState<NoteData[]>([]);
  const [rotate, setRotate] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteData | null>(null);

  const notesCollection = collection(db, "notes");
  const selectedNoteId: string | null = localStorage.getItem("selectedNoteId");

  const handleSelectNote = (note: NoteData) => {
    localStorage.setItem("selectedNoteId", note.id);
    setSelectedNote(note);
  };

  const handleSidebar = () => {
    setRotate(!rotate);
  };

  //get the users notes
  const [user, setUser] = useState<string | null>(null);

  // useEffect(() => {
  //   const getNotesList = async () => {
  //     try {
  //       const data = await getDocs(notesCollection);
  //       const filteredData = data.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       })) as NoteData[];
  //       setNotesList(filteredData);
  //       //console.log(notesList)
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   getNotesList();

  //   if (selectedNoteId) {
  //     const storedNote = notesList.find((note) => note.id === selectedNoteId);
  //     if (storedNote) {
  //       setSelectedNote(storedNote);
  //     }
  //   }
  // }, [notesList, notesCollection, selectedNoteId]);

  useEffect(() => {
    // Check if the user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);

        // Query Firestore for the user's notes
        const notesCollection = collection(db, "notes"); // Replace with your Firestore instance
        const userNotesQuery = query(
          notesCollection,
          where("userId", "==", user.uid)
        );

        //     getDocs(userNotesQuery)
        //       .then((querySnapshot) => {
        //         const notesData = [];
        //         querySnapshot.forEach((doc) => {
        //           notesData.push({ id: doc.id, ...doc.data() });
        //         });
        //         setNotesList(notesData);
        //       })
        //       .catch((error) => {
        //         console.error("Error fetching notes: ", error);
        //       });
        //   } else {
        //     setUser(null);
        //     setNotesList([]);
        //   }
        getDocs(userNotesQuery)
          .then((querySnapshot) => {
            const notesData = [];
            querySnapshot.forEach((doc) => {
              notesData.push({ id: doc.id, ...doc.data() });
            });
            setNotesList(notesData);
          })
          .catch((error) => {
            console.error("Error fetching notes: ", error);
          });
      } else {
        setUser(null);
        setNotesList([]);
      }
      console.log(notesList);
      return () => unsubscribe();
    });
  }, []);

  //add new note
  const createNote = async (newNote) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return;
      }

      const notesCollection = collection(db, "notes");

      await addDoc(notesCollection, {
        userId: currentUser.uid,
        title: newNote.title,
      });
    } catch (error) {
      console.error("Error creating note:", error);
    }
    console.log(getDocs(notesCollection))
  };  

  return (
    <div className="flex w-full h-screen">
      {rotate && <OpenSidebar handleSidebar={handleSidebar} />}
      <SideBar
        notesList={notesList}
        rotate={rotate}
        handleSidebar={handleSidebar}
        onSelectNote={handleSelectNote}
        selectedNoteId={selectedNoteId}
        addNote={createNote}
      />
      <Note selectedNote={selectedNote} rotate={rotate} />
    </div>
  );
};

export default Dashboard;
