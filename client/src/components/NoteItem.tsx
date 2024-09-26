import React, { useEffect, useState } from "react";
import "animate.css";
import { backend_url } from "../libs/url";

interface Note {
  id: string;
  title: string;
  content: string;
  file_url?: string;
}

interface NoteItemProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  deletingNoteId: string | null;
}

const NoteItem: React.FC<NoteItemProps> = ({
  note,
  onEdit,
  onDelete,
  deletingNoteId,
}) => {
  const [isNew, setIsNew] = useState(true);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => setIsNew(false), 1000);
  }, []);

  const handleImageError = (
    error: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    console.error("Image failed to load:", error);
    setImageError("Failed to load image");
  };



  return (
    <div
      className={`bg-white dark:bg-gray-800 p-4 rounded-md shadow-md relative ${
        isNew ? "animate__animated animate__fadeInDown" : ""
      }`}
    >
      <h3
        className={`text-lg font-semibold mb-2 text-gray-900 dark:text-white ${
          isNew ? "animate__animated animate__fadeInDown" : ""
        }`}
      >
        {note.title}
      </h3>
      <p
        className={`text-gray-700 dark:text-gray-300 mb-4 ${
          isNew ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        {note.content}
      </p>
      {/* {note.file_url && (
        <div className="mb-4">
          <img
            src={`${backend_url}${note.file_url}`}
            alt="Note attachment"
            onError={handleImageError}
            className={`w-full md:w-44 md:h-44 h-auto rounded-md ${
              isNew ? "animate__animated animate__fadeIn" : ""
            }`}
          />
        
         
        </div>
      )} */}

      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onEdit(note)}
          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className={`${
            deletingNoteId === note.id
              ? "text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-500"
              : "text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
          }`}
          disabled={deletingNoteId === note.id}
        >
          {deletingNoteId === note.id ? (
            <svg
              className="animate-spin h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "🗑️"
          )}
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
