import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

interface NoteFormProps {
  onInputChange: (title: string, content: string) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onInputChange }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [showContent, setShowContent] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      if (title.trim() || content.trim()) {
        onInputChange(title, content);
        setTitle("");
        setContent("");
        toast.success("Note Created! 😊");
      }
      setShowContent(false);
    }
  };

  const handleClose = () => {
    if (title.trim() || content.trim()) {
      onInputChange(title, content);
      setTitle("");
      setContent("");
      toast.success("Note Created! 😊");
    }
    setShowContent(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [title, content]);

  return (
    <form
      ref={formRef}
      className="mb-6 bg-white dark:bg-gray-800 p-1 rounded-md shadow-md"
    >
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={() => setShowContent(true)}
        placeholder="Title"
        className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      >
        {" "}
      </textarea>
      {showContent && (
        <div className="">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="w-full md:h-[200px]  px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          ></textarea>
          <button
            type="button"
            onClick={handleClose}
            className="bg-gray-500 text-white px-2 py-[2px] text-sm rounded-md transition duration-300 hover:bg-green-600"
          >
            Close
          </button>
        </div>
      )}
    </form>
  );
};

export default NoteForm;
