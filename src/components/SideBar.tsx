import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import NoteData from "../noteData";
import { auth } from "../config/firebase";
import { BiLogOut } from "react-icons/bi";
import SearchAndAdd from "./SearchAndAdd";
import { useEffect, useState } from "react";

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
}) => {
  //search for notes
  const [search, setSearch] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  // Inside your NotesList component
  useEffect(() => {
    // Filter notes based on the search query
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
          : "border border-t-gray-100 border-b-gray-100 border-r-gray-100 p-5  cursor-pointer"
      }
      onClick={() => onSelectNote(note)}
    >
      <h3>{note.title}</h3>
      <p className="text-gray-400">{note.content.substring(0, 20)}...</p>
    </div>
  ));

  //small screen detect
  const isSmallScreen = window.innerWidth <= 768;
  const isMobileScreen = window.innerWidth <= 500;


  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: rotate ? -3000 : 0, width: rotate ? "0" : isMobileScreen ? "100%": isSmallScreen ? "50%": "25%" }}

      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 1,
      }}
      className="border-2 border-r-gray-300 h-screen fixed z-10 bg-white md:relative w-[50%]"
    >
      <div className=" flex items-center justify-between p-3">
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
      <SearchAndAdd search={search} setSearch={setSearch} />
      <div>{notesTitles}</div>

      <div className="absolute bottom-0 border-2 border-t-black border-r-black w-full p-4 flex items-center justify-between ">
        <img
          className="w-[40px] rounded-full"
          src={auth.currentUser?.photoURL}
          alt=""
        />
        <h3> {auth.currentUser?.displayName} </h3>
        <div className="text-[20px] text-gray-500 cursor-pointer">
          <BiLogOut />
        </div>
      </div>
    </motion.div>
  );
};

export default SideBar;
