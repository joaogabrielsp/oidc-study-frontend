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

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch(
          "http://localhost:3000/me",
          {
            credentials: "include",
          },
        );

        if (response.status === 401) {
          window.location.href =
            "http://localhost:3000/login";
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const user = await response.json();

        setUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return {
    user,
    loading,
  };
}