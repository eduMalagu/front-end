"use server";

import { API_URL, readApiMessage } from "@/lib/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface CreateCurso {
  nome: string;
  professor?: string;
  cargaHoraria: number;
  descricao: string;
}

export async function createCurso(curso: CreateCurso) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;
  let response: Response;

  try {
    response = await fetch(`${API_URL}/cursos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: { tags: ["listar"] },
      body: JSON.stringify(curso),
    });

    if (response.status === 201 || response.status === 200) {
      revalidateTag("listar", "max");
      return;
    }
  } catch (error) {
    console.error("Erro ao cadastrar curso:", error);
    return `Nao foi possivel conectar ao backend em ${API_URL}.`;
  }

  if (response.status === 401) {
    redirect("/login");
  }

  const message = await readApiMessage(response);
  return message || "Nao foi possivel cadastrar o curso.";
}
