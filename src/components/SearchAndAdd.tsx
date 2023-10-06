import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { motion } from "framer-motion";

interface SearchAndAdd {
  search: string;
  setSearch: (e: string) => void;
  addNote: (newNote: { title: string }) => void;
}

const SearchAndAdd: React.FC<SearchAndAdd> = ({
  search,
  setSearch,
  addNote,
}) => {
  const [newNote, setNewNote] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    addNote({ title });
    setTitle("");
    setNewNote(!newNote);
  };

  return (
    <motion.div className=" w-full">
      <div className="flex items-center justify-center gap-3 py-6 px-2 ">
        <input
          type="text"
          placeholder="Search Note"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-[#BDBDBD] p-2 pl-4 rounded-md bg-[#D6D6D6] text-[#726F6F] text-[15px] font-light font-['Poppins'] focus:outline-none"
        />

        <motion.button
          onClick={() => setNewNote(!newNote)}
          className="w-10 h-10 bg-neutral-700 bg-opacity-80 rounded-[5px] flex items-center justify-center text-white text-[35px]"
        >
          <motion.div
            whileHover={{ rotate: "20deg" }}
            whileTap={{ rotate: "90deg" }}
          >
            <IoMdAdd />
          </motion.div>
        </motion.button>
      </div>
      {newNote && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{
            type: "spring",
            duration: 0.5,
          }}
          className="w-full flex items-center justify-center flex-col p-4"
        >
          <input
            type="text"
            placeholder="Title"
            className="border border-[#BDBDBD] p-2 pl-4 rounded-md bg-[#D6D6D6] text-[#726F6F] text-[15px] font-light font-['Poppins'] focus:outline-none w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="flex items-stretch justify-end w-full gap-2 py-4">
            <motion.button
              whileHover={{ scale: 1.05, x: 0 }}
              whileTap={{ scale: 0, x: 0 }}
              transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.5,
              }}
              onClick={() => setNewNote(!newNote)}
              className="text-neutral-700 border border-neutral-700 text-[15px] font-light py-2 px-6 rounded-sm bg-transparent "
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, x: 0 }}
              whileTap={{ scale: 0, x: 0 }}
              transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.5,
              }}
              onClick={handleSubmit}
              className="text-white text-[15px] font-light py-2 px-6 rounded-sm bg-neutral-700 bg-opacity-80"
            >
              Save
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchAndAdd;
