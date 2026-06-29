import { FileText } from "lucide-react";
import { Button } from "../ui/button";

interface EmptyStateProps {
  onCreateNote?: () => void;
}

export function EmptyState({ onCreateNote }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
        <FileText className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
        No notes yet
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Get started by creating your first note. You can write ideas, lists, or anything you need to remember.
      </p>
      <Button onClick={onCreateNote} className="mt-6" size="lg">
        Create Note
      </Button>
    </div>
  );
}
