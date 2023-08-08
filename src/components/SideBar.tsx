import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { motion } from "framer-motion";

const SideBar = ({ notesList }) => {
  const [rotate, setRotate] = useState(false);

  const notesTitles = notesList.map((note) => (
    <div className="border border-gray-200 p-5" key={note.id}>
      <h3>{note.title}</h3>
      <p className="text-gray-400">{note.content.substring(0, 20)}...</p>
    </div>
  ));
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: rotate ? -3000 : 0, width: rotate ? "0" : "25%" }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.8,
      }}
      className=
           "border border-r-gray-300 h-screen "


    >
      <div className="bg-gray-200 flex items-center justify-between p-5">
        <h1 className="text-black text-2xl font-semibold0">NOTE iT</h1>
        <motion.div
          onClick={() => setRotate(!rotate)}
          className="flex flex-col items-center justify-center bg-white p-2 px-4 rounded-md cursor-pointer w-fit"
        >
          <motion.div
            whileHover={{ scale: rotate ? 1.1 : 1.1 }}
            whileTap={{ scale: rotate ? 0.9 : 0 }}
            animate={{ rotate: rotate ? 0 : 180 }}
            className=" text-gray-600"
          >
            <IoIosArrowDown />
          </motion.div>
          <motion.div
            whileHover={{ scale: rotate ? 1.1 : 1.1 }}
            whileTap={{ scale: rotate ? 0.9 : 0 }}
            animate={{ rotate: rotate ? 180 : 0 }}
            className=" text-gray-600"
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
