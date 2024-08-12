import React from "react";
import toast from "react-hot-toast";

interface Note {
  id: string;
  title: string;
  content: string;
}

interface EditNotePopupProps {
  note: Note | null;
  loadingUpdate: boolean;
  onClose: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const EditNotePopup: React.FC<EditNotePopupProps> = ({
  note,
  onClose,
  onChange,
}) => {
  if (!note) return null;

const closeEditPopup =()=>{
  onClose();
  toast.success("Note updated! ✏️");
}

  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("popup-overlay")) {
      onClose();
      toast.success("Note updated! ✏️");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center popup-overlay"
      onClick={handleOutsideClick}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Edit Note
        </h2>
        <input
          type="text"
          value={note.title}
          onChange={onChange}
          name="title"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Title"
        />
        <textarea
          value={note.content}
          onChange={onChange}
          name="content"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          rows={4}
          placeholder="Content"
        ></textarea>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={closeEditPopup}
            className="px-4 py-0 border shadow-md rounded-md text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
         Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNotePopup;
