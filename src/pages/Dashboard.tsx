import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
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

  //inline edits
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [content, setContent] = useState("");

  const notesCollection = collection(db, "notes");
  const selectedNoteId: string | null = localStorage.getItem("selectedNoteId");

  const handleSelectNote = (note: NoteData) => {
    localStorage.setItem("selectedNoteId", note.id);
    setSelectedNote(note);
  };

  //keep last note open

  useEffect(() => {
    const lastOpenedNoteId = localStorage.getItem("selectedNoteId");

    if (lastOpenedNoteId) {
      const lastOpenedNote = notesList.find(
        (note) => note.id === lastOpenedNoteId
      );

      if (lastOpenedNote) {
        setSelectedNote(lastOpenedNote);
      }
    }
  }, [notesList]);

  const handleSidebar = () => {
    setRotate(!rotate);
  };

  //get the users notes
  const [user, setUser] = useState<string | null>(null);

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

        const unsubscribeNotes = onSnapshot(userNotesQuery, (snapshot) => {
          const notesData: { id: string }[] = [];
          snapshot.forEach((doc) => {
            notesData.push({ id: doc.id, ...doc.data() });
          });
          setNotesList(notesData);
        });

        return () => unsubscribeNotes();
      } else {
        setUser(null);
        setNotesList([]);
      }
    });
    return () => unsubscribe();
  }, []);

  //add new note
  const createNote = async (newNote: { title: string }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return;
      }

      const notesCollection = collection(db, "notes");

      const docRef = await addDoc(notesCollection, {
        userId: currentUser.uid,
        title: newNote.title,
      });

      const newNoteWithId = {
        id: docRef.id,
        userId: currentUser.uid,
        title: newNote.title,
      };

      setNotesList([newNoteWithId, ...notesList]);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  //delete note
  const deleteNote = async (id) => {
    const noteDoc = doc(db, "notes", id);
    await deleteDoc(noteDoc);
  };

  //update note
  const updateNoteTitle = async (id, newTitle) => {
    const noteDoc = doc(db, "notes", id);
    await updateDoc(noteDoc, { title: newTitle });
  };

  const updateNoteContent = async (id, newContent) => {
    const noteDoc = doc(db, "notes", id);
    await updateDoc(noteDoc, { content: newContent });
  };

  return (
    <div className="flex w-full h-full">
      {rotate && <OpenSidebar handleSidebar={handleSidebar} />}
      <SideBar
        notesList={notesList}
        rotate={rotate}
        handleSidebar={handleSidebar}
        onSelectNote={handleSelectNote}
        selectedNoteId={selectedNoteId}
        addNote={createNote}
      />
      <Note
        selectedNote={selectedNote}
        notesList={notesList}
        rotate={rotate}
        setNoteTitle={setNoteTitle}
        setContent={setContent}
        deleteNote={deleteNote}
        updateNoteTitle={updateNoteTitle}
        updateNoteContent={updateNoteContent}
      />
    </div>
  );
};

export default Dashboard;
