import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/notes/EmptyState";
import { NotesList } from "@/components/notes/NotesList";
import { NoteEditor } from "@/components/notes/NoteEditor";
import type { Note } from "@/components/notes/NoteCard";
import { ArrowLeft, NotebookPen, Plus } from "lucide-react";
import type { User } from "@/hooks/useAuth";
import { apiFetch } from "@/lib/api";

type Mode = "list" | "create" | "edit";

type Props = {
  user: User | null;
};

const API_URL = import.meta.env.VITE_API_URL;

export function NotesPage({ user }: Props) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [mode, setMode] = useState<Mode>("list");

  useEffect(() => {
    async function loadNotes() {
      try {
        const res = await apiFetch(`${API_URL}/notes`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load notes");
        setNotes(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadNotes();
  }, []);

  async function handleCreate(text: string) {
    const res = await apiFetch(`${API_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ text }),
    });
    if (!res.ok) return;
    const newNote = await res.json();
    setNotes((prev) => [newNote, ...prev]);
    setMode("list");
  }

  async function handleUpdate(id: string, text: string) {
    const res = await apiFetch(`${API_URL}/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ text }),
    });
    if (!res.ok) return;
    const updated = await res.json();
    setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
    setMode("list");
    setEditingNote(null);
  }

  async function handleDelete(id: string) {
    try {
      const res = await apiFetch(`${API_URL}/notes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error(await res.text());
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  function handleOpen(id: string) {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    setEditingNote(note);
    setMode("edit");
  }

  function handleBackToList() {
    setMode("list");
    setEditingNote(null);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (mode === "create" || mode === "edit") {
    const isEdit = mode === "edit";
    return (
      <div className="mx-auto min-h-screen max-w-2xl px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handleBackToList}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold">
            {isEdit ? "Update Note" : "New Note"}
          </h1>
        </div>
        <NoteEditor
          initialContent={isEdit ? editingNote?.text : ""}
          onCancel={handleBackToList}
          onSave={(text) =>
            isEdit && editingNote
              ? handleUpdate(editingNote.id, text)
              : handleCreate(text)
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <NotebookPen className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-semibold">My Notes</h1>
        </div>
        <Button onClick={() => setMode("create")}>
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      {notes.length === 0 ? (
        <EmptyState onCreateNote={() => setMode("create")} />
      ) : (
        <NotesList
          notes={notes}
          onOpenNote={handleOpen}
          onDeleteNote={handleDelete}
        />
      )}
    </div>
  );
}