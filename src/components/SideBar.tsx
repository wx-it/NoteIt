//import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import NoteData from "../noteData";
import { auth } from "../config/firebase";
import { BiLogOut } from "react-icons/bi";
import SearchAndAdd from "./SearchAndAdd";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface SidebarProps {
  notesList: NoteData[];
  handleSidebar: () => void;
  rotate: boolean;
  onSelectNote: (note: NoteData) => void;
  selectedNoteId: string | null;
  addNote: (newNote: { title: string }) => void;
  setEditorKey: (newValue: number | ((prevKey: number) => number)) => void;
}

const SideBar: React.FC<SidebarProps> = ({
  notesList,
  handleSidebar,
  rotate,
  onSelectNote,
  selectedNoteId,
  addNote,
  setEditorKey,
}) => {
  //const expandAnimationRef = useRef(null)
  //search for notes
  const [search, setSearch] = useState("");
  const [filteredNotes, setFilteredNotes] = useState<NoteData[]>([]);

  useEffect(() => {
    const filtered = notesList.filter((note) => {
      const searchRegex = new RegExp(search, "i"); // Case-insensitive search
      return searchRegex.test(note.title) || searchRegex.test(note.content);
    });
    setFilteredNotes(filtered);
  }, [search, notesList]);

  //get all notes titles
  const notesTitles = filteredNotes.map((note: NoteData) => (
    <motion.div
      whileHover={{ scale: 1.025, y: -2 }}
      whileTap={{ scale: 1, y: 0 }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.5,
      }}
      key={note.id}
      className={
        selectedNoteId === note.id
          ? "bg-stone-800 bg-opacity-40 rounded-[20px] shadow m-3 p-5 cursor-pointer"
          : "bg-stone-400 bg-opacity-40 rounded-[20px] shadow m-3 p-5 cursor-pointer"
      }
      onClick={() => {
        onSelectNote(note);
        setEditorKey((prevKey: number) => prevKey + 1);
      }}
    >
      <h3 className="text-sm font-medium">{note.title}</h3>
    </motion.div>
  ));

  //small screen detect
  const isSmallScreen = window.innerWidth <= 768;
  const isMobileScreen = window.innerWidth <= 500;

  //logout from account
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{
        x: rotate ? -3000 : 0,
        width: rotate
          ? "0"
          : isMobileScreen
          ? "100%"
          : isSmallScreen
          ? "50%"
          : "25%",
      }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 1,
      }}
      className="md:border-r-2 md:border-r-gray-300 h-screen fixed z-10 bg-[#E4E4E4] md:sticky md:top-0 w-[50%] flex items-start justify-between flex-col "
    >
      <div className="w-full">
        <div className=" flex items-center justify-between p-6 w-full">
          <h1 className="text-black text-[20px] md:text-[1.5vw] font-semibold">
            NoteIt.
          </h1>
          <motion.div
            onClick={handleSidebar}
            className="flex flex-col items-center justify-center p-[2.5vw] md:p-[0.75vw] rounded-full cursor-pointer w-fit bg-[#5E5E5E]"
          >
            {/* <motion.div
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
            </motion.div> */}
            {/* <UseAnimations
              animation={maximizeMinimize2}
              size={20}
              strokeColor="white"
              speed={0.25}
            /> */}

            <motion.svg
              whileHover={{ rotate: "20deg" }}
              whileTap={{ rotate: "90deg" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="close"
              width={"20"}
              fill="white"
              className="focus:outline-none"
            >
              <g data-name="Layer 2">
                <path
                  d="m13.41 12 4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"
                  data-name="close"
                ></path>
              </g>
            </motion.svg>
          </motion.div>
        </div>
        <SearchAndAdd search={search} setSearch={setSearch} addNote={addNote} />
        <div className=" overflow-y-auto max-h-[69vh] w-full">
          {notesTitles}
        </div>
      </div>
      <div className=" border border-t-black w-full p-4 flex items-center justify-between bg-[#E4E4E4] z-10 ">
        <div className="flex items-center justify-center gap-3">
          {auth.currentUser?.photoURL ? (
            <img
              className="w-[40px] rounded-full"
              src={auth.currentUser?.photoURL || ""}
              alt=""
            />
          ) : (
            <div className="text-zinc-700 text-[35px]">
              <FaUserCircle />
            </div>
          )}
          <h3 className="text-zinc-700 text-xl ">
            {auth.currentUser?.displayName}
          </h3>
        </div>
        <button
          onClick={handleLogout}
          className="text-[20px] text-zinc-700 cursor-pointer"
        >
          <BiLogOut />
        </button>
      </div>
    </motion.div>
  );
};

export default SideBar;
