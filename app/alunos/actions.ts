"use server";

import { Aluno } from "@/interfaces/alunos";
import { API_URL, readApiMessage } from "@/lib/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAlunos() {
  let response: Response;

  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("access_token")?.value;

    response = await fetch(`${API_URL}/alunos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["listar"] },
    });
  } catch (e) {
    console.error(e);
    return [];
  }

  if (response.status === 401) {
    redirect("/login");
  }

  if (response.status === 200) {
    const data = await response.json();
    return data as Aluno[];
  }

  console.error(response);
  return [];
}

export async function deleteAluno(id: number) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;

  const response = await fetch(`${API_URL}/alunos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["listar"] },
  });

  if (response.status === 204) {
    revalidateTag("listar", "max");
    return;
  }
  if (response.status === 401) {
    redirect("/login");
  }

  return await readApiMessage(response);
}
