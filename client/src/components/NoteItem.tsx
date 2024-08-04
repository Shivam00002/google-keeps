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
    <div
      key={note.id}
      className="bg-white border shadow-md dark:bg-gray-800 p-4 rounded-lg"
    >
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {note.title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{note.content}</p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onEdit(note)}
          className="text-blue-600 hover:text-blue-800 px-2 rounded-md shadow-md border dark:text-blue-400 dark:hover:text-blue-300"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className={`${
            deletingNoteId === note.id
              ? "bg-white text-gray-700 border-gray-300"
              : "text-red-600"
          } px-2 rounded-md shadow-md transition duration-300 ${
            deletingNoteId === note.id
              ? "hover:bg-gray-100"
              : "hover:text-red-800"
          }`}
          disabled={deletingNoteId === note.id}
        >
          {deletingNoteId === note.id ? (
            <img
              src="https://cdn-icons-gif.flaticon.com/17098/17098052.gif"
              alt="Loading..."
              className="inline w-10 h-5"
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
