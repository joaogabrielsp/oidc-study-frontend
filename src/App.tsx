import { useAuth } from "./hooks/useAuth";
import { NotesPage } from "./pages/NotesPage";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const { user, loading, error } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
  return <div>Error</div>;
  }

  return (
    <>
      <NotesPage user={user} />
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;