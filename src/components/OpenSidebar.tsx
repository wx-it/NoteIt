import { motion } from "framer-motion";

interface OpenSidebarProps {
  handleSidebar: () => void;
}

const OpenSidebar: React.FC<OpenSidebarProps> = ({ handleSidebar }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1, x: 0 }}
      whileTap={{ scale: 0, x: 0 }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 1,
      }}
      onClick={handleSidebar}
      className="fixed left-4 top-4 bg-[#5E5E5E] p-4 rounded-full cursor-pointer "
    >
      
    </motion.button>
  );
};

export default OpenSidebar;
