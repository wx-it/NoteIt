import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import NoteData from "../noteData";
interface SidebarProps {
  notesList: NoteData[];
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
  const notesTitles = notesList.map((note) => (
    <div
      key={note.id}
      className={
        selectedNoteId === note.id
          ? "border-2 border-t-black border-b-black border-r-black p-5 cursor-pointer"
          : "border-2 border-gray-100 p-5  cursor-pointer"
      }
      onClick={() => onSelectNote(note)}
    >
      <h3>{note.title}</h3>
      <p className="text-gray-400">{note.content.substring(0, 20)}...</p>
    </div>
  ));
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: rotate ? -3000 : 0, width: rotate ? "0" : "20%" }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 1,
      }}
      className="border-2 border-r-gray-300 h-screen"
    >
      <div className=" flex items-center justify-between p-5">
        <h1 className="text-black text-2xl font-semibold">NOTE iT</h1>
        <motion.div
          onClick={handleSidebar}
          className="flex flex-col items-center justify-center p-2 px-4 border-2 border-black cursor-pointer w-fit"
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
      <div>{notesTitles}</div>
    </motion.div>
  );
};

export default SideBar;
