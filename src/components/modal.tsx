import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
export interface ModalProps {
  isOpen: boolean;
  onclose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onclose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onclose}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onclose}
        >
          <AiOutlineClose className="size-[24px]" />
        </button>

        {children}
      </motion.div>
    </div>
  );
};
