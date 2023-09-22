import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import NoteData from "../noteData";
import { auth } from "../config/firebase";
import { BiLogOut } from "react-icons/bi";
import SearchAndAdd from "./SearchAndAdd";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  notesList: NoteData[];
  filteredNotes: NoteData[];
  handleSidebar: () => void;
  rotate: boolean;
  onSelectNote: (note: NoteData) => void;
  selectedNoteId: string | null;
}

const SideBar: React.FC<SidebarProps> = ({
  notesList,
  handleSidebar,
  rotate,
  onSelectNote,
  selectedNoteId,
  addNote
}) => {
  //search for notes
  const [search, setSearch] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    const filtered = notesList.filter((note) => {
      const searchRegex = new RegExp(search, "i"); // Case-insensitive search
      return searchRegex.test(note.title) || searchRegex.test(note.content);
    });
    setFilteredNotes(filtered);
  }, [search, notesList]);

  //get all notes titles
  const notesTitles = filteredNotes.map((note) => (
    <div
      key={note.id}
      className={
        selectedNoteId === note.id
          ? "border-2 border-t-black border-b-black border-r-black p-5 cursor-pointer"
          : "border-b border-b-gray-300 border-r-gray-100 p-5 cursor-pointer"
      }
      onClick={() => onSelectNote(note)}
    >
      <h3>{note.title}</h3>
    </div>
  ));

  //small screen detect
  const isSmallScreen = window.innerWidth <= 768;
  const isMobileScreen = window.innerWidth <= 500;


  //logout from account
  const navigate = useNavigate();

  const handleLogout = () => {
      signOut(auth).then(() => {
          navigate("/");
      }).catch((error) => {
        console.log(error)
      });
  }

  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: rotate ? -3000 : 0, width: rotate ? "0" : isMobileScreen ? "100%": isSmallScreen ? "50%": "25%" }}

      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 1,
      }}
      className="md:border-r-2 md:border-r-gray-300 h-screen fixed z-10 bg-white md:sticky md:top-0 w-[50%] flex items-start justify-between flex-col "
    >
      <div className="w-full" >
      <div className=" flex items-center justify-between p-3 w-full">
        <h1 className="text-black text-[5vw] md:text-[3vw] font-semibold">NOTE iT</h1>
        <motion.div
          onClick={handleSidebar}
          className="flex flex-col items-center justify-center py-[.5vw] px-[2.5vw] md:px-[1.25vw] border-2 border-black cursor-pointer w-fit"
        >
          <motion.div
            whileHover={{ scale: rotate ? 1.1 : 1.1 }}
            whileTap={{ scale: rotate ? 0.9 : 0 }}
            animate={{ rotate: rotate ? 0 : 180 }}
            className=" text-black"
          >
            <IoIosArrowDown />
          </motion.div>
          <motion.div
            whileHover={{ scale: rotate ? 1.1 : 1.1 }}
            whileTap={{ scale: rotate ? 0.9 : 0 }}
            animate={{ rotate: rotate ? 180 : 0 }}
            className=" text-black"
          >
            <IoIosArrowDown />
          </motion.div>
        </motion.div>
      </div>
      <SearchAndAdd search={search} setSearch={setSearch} addNote={addNote}  />
      <div className=" overflow-y-auto max-h-[70vh] w-full" >{notesTitles}</div>

      </div>
      <div className=" border-2 border-t-black border-r-black w-full p-4 flex items-center justify-between bg-white z-10 ">
        <img
          className="w-[40px] rounded-full"
          src={auth.currentUser?.photoURL}
          alt=""
        />
        <h3> {auth.currentUser?.displayName} </h3>
        <button onClick={handleLogout} className="text-[20px] text-gray-500 cursor-pointer">
          <BiLogOut />
        </button>
      </div>
    </motion.div>
  );
};

export default SideBar;
