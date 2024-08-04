import React, { useState } from "react";
import toast from "react-hot-toast";

interface NoteFormProps {
  onAddNote: (title: string, content: string) => void;
  loadingAdd: boolean;
}

const NoteForm: React.FC<NoteFormProps> = ({ onAddNote, loadingAdd }) => {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      toast.error("Both title and content are required! 🧐");
      return;
    }
    onAddNote(newTitle, newContent);
    setNewTitle("");
    setNewContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        placeholder="Title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      />
      <textarea
        placeholder="Content"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        rows={4}
      ></textarea>
      <button
        type="submit"
        className={`${
          loadingAdd ? "bg-white text-gray-700" : "bg-blue-500 text-white"
        } px-4 py-2 rounded-md transition duration-300 ${
          loadingAdd ? "border-gray-300" : "hover:bg-blue-600"
        }`}
        disabled={loadingAdd}
      >
        {loadingAdd ? (
          <img
            src="https://cdn-icons-gif.flaticon.com/17098/17098052.gif"
            alt="Loading..."
            className="inline w-10 h-5"
          />
        ) : (
          "Add Note"
        )}
      </button>
    </form>
  );
};

export default NoteForm;
