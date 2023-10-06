import { motion } from "framer-motion";

interface OpenSidebarProps {
  handleSidebar: () => void;
}

const OpenSidebar: React.FC<OpenSidebarProps> = ({ handleSidebar }) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.1,
        x: 0,
        rotate: "10deg",
        //   border: "2px #5E5E5E solid",
        //   backgroundColor: "transparent",
        //   padding: "1rem",
      }}
      whileTap={{ rotate: "180deg" }}
       transition={{
         type: "spring",
         duration: 0.5,
       }}
      onClick={handleSidebar}
      className="fixed left-4 top-4 bg-[#5E5E5E] py-3 px-4 pr-[1.2rem] rounded-full cursor-pointer "
    >
      <motion.svg

        // whileHover={{
        //   rotate: "10deg",
        // }}
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="20"
        id="arrow"
        transform="scale(-1, 1)"
      >
        <path
          fill="white"
          fillRule="evenodd"
          d="M.366 19.708c.405.39 1.06.39 1.464 0l8.563-8.264a1.95 1.95 0 0 0 0-2.827L1.768.292A1.063 1.063 0 0 0 .314.282a.976.976 0 0 0-.011 1.425l7.894 7.617a.975.975 0 0 1 0 1.414L.366 18.295a.974.974 0 0 0 0 1.413"
        ></path>
      </motion.svg>
    </motion.button>
  );
};

export default OpenSidebar;
