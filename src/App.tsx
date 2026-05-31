import { useEffect, useState } from "react";

type User = {
  sub: string;
  email?: string;
  preferred_username?: string;
  given_name?: string;
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch("http://localhost:3000/me", {
          credentials: "include",
        });

        if (response.status === 401) {
          window.location.href = "http://localhost:3000/login";
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const user: User = await response.json();

        setUser(user);
      } catch (error) {
        console.error(error);

        setError("Failed to load user");
      }
    }

    loadUser();
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-semibold">{error}</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">OIDC Study</h1>

      <div className="rounded border p-4">
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;