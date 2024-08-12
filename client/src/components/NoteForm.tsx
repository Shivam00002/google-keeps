import React, { useState } from "react";

interface NoteFormProps {
  onAddNote: (title: string, content: string) => void;
  loadingAdd: boolean;
}

const NoteForm: React.FC<NoteFormProps> = ({ onAddNote, loadingAdd }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddNote(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-md shadow-md"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        rows={4}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      ></textarea>
      <button
        type="submit"
        className={`w-full ${
          loadingAdd
            ? "bg-white text-gray-700 border-gray-300"
            : "bg-blue-500 text-white"
        } px-4 py-2 rounded-md transition duration-300 ${
          loadingAdd ? "hover:bg-gray-100" : "hover:bg-blue-600"
        }`}
        disabled={loadingAdd}
      >
        {loadingAdd ? (
          <img
            src="https://cdn-icons-gif.flaticon.com/17098/17098052.gif"
            alt="Loading"
            className="inline-block h-5 w-5"
          />
        ) : (
          "Add Note"
        )}
      </button>
    </form>
  );
};

export default NoteForm;
