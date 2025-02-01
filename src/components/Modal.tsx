import { useState } from "react";

interface ModalProps {
  message: string;
  buttonText: string;
}

const Modal = ({ message, buttonText }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton pour ouvrir la modal */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        {buttonText}
      </button>

      {/* Modal DaisyUI */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{message}</h2>
            <button 
              onClick={() => setIsOpen(false)} 
              className="mt-4 px-4 py-2  rounded-md transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
