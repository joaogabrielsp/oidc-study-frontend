import { NoteCard, type Note } from "./NoteCard";

interface NotesListProps {
  notes: Note[];
  onDeleteNote?: (id: string) => void;
  onOpenNote?: (id: string) => void;
}

export function NotesList({ notes, onDeleteNote, onOpenNote }: NotesListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={onDeleteNote}
          onOpen={onOpenNote}
        />
      ))}
    </div>
  );
}
