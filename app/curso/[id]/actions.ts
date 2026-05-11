"use server";

import { Curso } from "@/interfaces/cursos";
import { API_URL, readApiMessage } from "@/lib/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface UpdateCursoPayload {
  nome: string;
  professor?: string;
  cargaHoraria: number;
  descricao: string;
}

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

export async function updateCurso(id: number, curso: UpdateCursoPayload) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;
  let response: Response;

  try {
    response = await fetch(`${API_URL}/cursos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(curso),
    });
  } catch (error) {
    console.error("Erro ao atualizar curso:", error);
    return error instanceof Error
      ? `Erro ao atualizar curso: ${error.message}`
      : `Nao foi possivel conectar ao backend em ${API_URL}.`;
  }

  if (response.status === 401) {
    redirect("/login");
  }

  if (response.status === 200 || response.status === 204) {
    revalidateTag("listar", "max");
    return;
  }

  const message = await readApiMessage(response);
  return message || "Nao foi possivel salvar o curso.";
}
