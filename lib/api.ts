export const API_URL = process.env.API_URL ?? "http://localhost:8080";

export async function readApiMessage(response: Response) {
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    const data = await response.json();

    if (typeof data === "string") {
      return data;
    }

    if (data?.message) {
      return data.message as string;
    }

    if (data?.error) {
      return data.error as string;
    }

    return JSON.stringify(data);
  }

  const text = await response.text();
  return text;
}
