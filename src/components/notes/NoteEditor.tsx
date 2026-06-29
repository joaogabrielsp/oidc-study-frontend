import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface NoteEditorProps {
  initialContent?: string;
  isLoading?: boolean;
  onSave?: (content: string) => void;
  onCancel?: () => void;
}

export function NoteEditor({
  initialContent = "",
  isLoading = false,
  onSave,
  onCancel,
}: NoteEditorProps) {
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    onSave?.(content);
  };

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your note..."
        disabled={isLoading}
        className="min-h-[320px] resize-none text-base leading-relaxed"
      />
      <div className="flex items-center justify-end gap-2">
        {onCancel && (
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        )}
        <Button onClick={handleSave} disabled={isLoading || !content.trim()}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
