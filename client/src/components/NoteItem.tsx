import React from "react";

interface Note {
  id: string;
  title: string;
  content: string;
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
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md relative">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        {note.title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{note.content}</p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onEdit(note)}
          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
        >
          Edit
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
            <img
              src="https://cdn-icons-gif.flaticon.com/17098/17098052.gif"
              alt="Loading"
              className="inline-block h-5 w-5"
            />
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
