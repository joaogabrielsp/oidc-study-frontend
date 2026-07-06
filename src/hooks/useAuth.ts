import { useEffect, useState } from "react";

export type User = {
  sub: string;
  email?: string;
  preferred_username?: string;
  given_name?: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch(
          `${API_URL}/me`,
          {
            credentials: "include",
          },
        );

        if (response.status === 401) {
          window.location.href =
            `${API_URL}/login`;
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const user = await response.json();

        setUser(user);
      } catch (err) {
        console.error(err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return {
    user,
    loading,
    error
  };
}