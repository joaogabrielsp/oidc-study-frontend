import { toast } from "sonner";

export class ForbiddenError extends Error {}

export async function apiFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const res = await fetch(input, { credentials: "include", ...init });

  if (res.status === 403) {
    toast.error("Access denied", {
      description: "You don't have permission to perform this action.",
    });
    throw new ForbiddenError();
  }

  return res;
}