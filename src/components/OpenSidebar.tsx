import { motion } from "framer-motion";

interface OpenSidebarProps {
  handleSidebar: () => void;
}

const OpenSidebar: React.FC<OpenSidebarProps> = ({ handleSidebar }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1, x: 0 }}
      whileTap={{ scale: 0.9, x: 0 }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.8,
      }}
      onClick={handleSidebar}
      className="fixed left-0 top-4 bg-black text-white p-5 pl-8 rounded-br-full rounded-tr-full cursor-pointer -translate-x-5 "
    >
      Open
    </motion.button>
  );
};

export default OpenSidebar;
