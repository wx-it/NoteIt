import { motion } from "framer-motion";

interface OpenSidebarProps {
  setRotate: boolean;
  rotate: boolean;
}

const OpenSidebar: React.FC<OpenSidebarProps> = ({ setRotate, rotate }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1, x: 0 }}
      whileTap={{ scale: 0.9, x: 0 }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.8,
      }}
      onClick={() => setRotate(!rotate)}
      className="fixed left-0 top-4 bg-black text-white p-5 pl-8 rounded-br-full rounded-tr-full cursor-pointer -translate-x-5 "
    >
      Open
    </motion.button>
  );
};

export default OpenSidebar;
