import React from "react";

interface Note {
  id: string;
  title: string;
  content: string;
}

interface EditNotePopupProps {
  note: Note | null;
  loadingUpdate: boolean;
  onClose: () => void;
  onUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const EditNotePopup: React.FC<EditNotePopupProps> = ({
  note,
  loadingUpdate,
  onClose,
  onUpdate,
  onChange,
}) => {
  if (!note) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Edit Note
        </h2>
        <form onSubmit={onUpdate}>
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
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${
                loadingUpdate
                  ? "bg-white text-gray-700 border-gray-300"
                  : "bg-blue-500 text-white"
              } px-4 py-2 rounded-md transition duration-300 ${
                loadingUpdate ? "hover:bg-gray-100" : "hover:bg-blue-600"
              }`}
              disabled={loadingUpdate}
            >
              {loadingUpdate ? (
                <img
                  src="https://cdn-icons-gif.flaticon.com/17098/17098052.gif"
                  alt="Loading..."
                  className="inline w-10 h-5"
                />
              ) : (
                "Update Note 🔄"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNotePopup;
