import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../libs/url";
import toast from "react-hot-toast";
import NoteForm from "../components/NoteForm";
import NoteItem from "../components/NoteItem";
import EditNotePopup from "../components/EditNotePopup";

interface Note {
  id: string;
  title: string;
  content: string;
  file_url?: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [error, setError] = useState<string>("");
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      fetchNotes();
    }
  }, [isAuthenticated, navigate]);

  const fetchNotes = async () => {
    setLoadingFetch(true);
    try {
      const response = await fetch(`${backend_url}/notes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        throw new Error("Failed to fetch notes");
      }
    } catch (err) {
      setError("An error occurred while fetching notes");
      console.error(err);
    } finally {
      setLoadingFetch(false);
    }
  };

  const handleAddNote = async (
    title: string,
    content: string,
    file: File | null
  ) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch(`${backend_url}/notes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      if (response.ok) {
        await fetchNotes();
        toast.success("Note Created! 😊");
      } else {
        throw new Error("Failed to add note");
      }
    } catch (err) {
      setError("An error occurred while adding the note");
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingNoteId(id);
    try {
      const response = await fetch(`${backend_url}/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        await fetchNotes();
        toast.success("Note deleted! 😐");
      } else {
        throw new Error("Failed to delete note");
      }
    } catch (err) {
      setError("An error occurred while deleting the note");
      console.error(err);
    } finally {
      setDeletingNoteId(null);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setIsEditPopupOpen(true);
  };

  const handleEditChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (editingNote) {
      const updatedNote = {
        ...editingNote,
        [e.target.name]: e.target.value,
      };
      setEditingNote(updatedNote);

      try {
        const response = await fetch(`${backend_url}/notes/${editingNote.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedNote),
        });
        if (response.ok) {
          setNotes((prevNotes) =>
            prevNotes.map((note) =>
              note.id === editingNote.id ? updatedNote : note
            )
          );
        } else {
          throw new Error("Failed to update note");
        }
      } catch (err) {
        setError("An error occurred while updating the note");
        console.error(err);
      }
    }
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    setEditingNote(null);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container max-w-[1080px] mx-auto px-4 py-8">
      <div className={`${isEditPopupOpen ? "blur-sm" : ""}`}>
        <h1 className="md:text-3xl text-[20px] font-bold mb-6 text-blue-500 dark:text-white">
          Note-Making Made Simple 📒
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <NoteForm onInputChange={handleAddNote} />

        {loadingFetch && <p>Loading notes...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
              deletingNoteId={deletingNoteId}
            />
          ))}
        </div>
      </div>

      {isEditPopupOpen && editingNote && (
        <EditNotePopup
          note={editingNote}
          loadingUpdate={loadingUpdate}
          onClose={closeEditPopup}
          onChange={handleEditChange}
        />
      )}
    </div>
  );
};

export default Notes;
