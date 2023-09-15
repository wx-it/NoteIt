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
      className="fixed left-0 top-0 bg-black text-white pl-4 pr-8 pb-6 pt-4 rounded-br-full cursor-pointer "
    >
      Open
    </motion.button>
  );
};

export default OpenSidebar;
