import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

interface NoteFormProps {
  onInputChange: (title: string, content: string, file: File | null) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onInputChange }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showContent, setShowContent] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      if (title.trim() || content.trim() || file) {
        onInputChange(title, content, file);
        resetForm();
        toast.success("Note Created! 😊");
      }
      setShowContent(false);
    }
  };

  const handleClose = () => {
    if (title.trim() || content.trim() || file) {
      onInputChange(title, content, file);
      resetForm();
      toast.success("Note Created! 😊");
    }
    setShowContent(false);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setFile(null);
    setFileName(null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [title, content, file]);

  return (
    <form
      ref={formRef}
      className="mb-6 bg-white dark:bg-gray-800 p-1 rounded-md shadow-md"
    >
      <input
        type="text"
        value={title}
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        onFocus={() => setShowContent(true)}
        placeholder="Title"
        className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      />
      {showContent && (
        <div className="relative">
          <input
            type="text"
            value={content}
            name="content"
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="w-full md:h-[200px] px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />

          <div className="flex border px-2 rounded-md items-center gap-x-3 mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 dark:bg-gray-700 dark:text-white">
                upload photo
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="file-upload" className="cursor-pointer">
                <input
                  id="file-upload"
                  type="file"
                  name="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="text-gray-500 hover:text-gray-700 text-xl">
                  📎
                </span>
              </label>
              {fileName && (
                <div className="flex items-center bg-gray-100 rounded-md px-2 py-1">
                  <span className="text-gray-500 mr-1">🏞️</span>
                  <span className="text-gray-700 text-sm truncate max-w-[100px]">
                    {fileName}
                  </span>
                  <button
                    onClick={() => {
                      setFile(null);
                      setFileName(null);
                    }}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="right-2 bottom-1 md:bottom-[2px] absolute text-white px-1 md:px-1 py-[1px] md:py-[2px] text-[10px] md:text-sm rounded-md transition duration-300 hover:bg-gray-300"
          >
            ❌
          </button>
        </div>
      )}
    </form>
  );
};

export default NoteForm;
