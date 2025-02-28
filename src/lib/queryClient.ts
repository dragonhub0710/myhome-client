export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined
): Promise<Response> {
  const token = localStorage.getItem("token");
  const headers = new Headers();
  if (data) headers.append("Content-Type", "application/json");
  if (token) headers.append("x-auth-token", token);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // Accessing the env variable
  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_BACKEND_URL environment variable is not defined."
    );
  }

  const res = await fetch(`${baseUrl}/${url}`, {
    method,
    headers: headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  return res;
}
