import { motion } from "framer-motion";

interface OpenSidebarProps {
  handleSidebar: () => void;
}

const OpenSidebar: React.FC<OpenSidebarProps> = ({ handleSidebar }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1, x: 0, border: "2px #5E5E5E solid", backgroundColor: "transparent", padding: "1rem" }}
      whileTap={{ scale: 0, x: 0 }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.5,
      }}
      onClick={handleSidebar}
      className="fixed left-4 top-4 border-[15px] border-[#5E5E5E]  rounded-full cursor-pointer "
    >
      
    </motion.button>
  );
};

export default OpenSidebar;
