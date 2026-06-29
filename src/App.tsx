import { useAuth } from "./hooks/useAuth";
import { NotesPage } from "./pages/NotesPage";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NotesPage user={user} />
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;