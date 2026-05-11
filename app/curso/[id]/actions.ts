"use server";

import { Curso } from "@/interfaces/cursos";
import { API_URL } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getCurso(id: number) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;
  let response: Response;

  try {
    response = await fetch(`${API_URL}/cursos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["listar"] },
    });
  } catch (error) {
    console.error("Erro ao buscar curso:", error);
    return null;
  }

  if (response.status === 401) {
    redirect("/login");
  }

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    console.error("Resposta inesperada ao buscar curso:", response.status);
    return null;
  }

  const data = await response.json();
  return data as Curso;
}
