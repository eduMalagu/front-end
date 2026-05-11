"use server";

import { Aluno } from "@/interfaces/alunos";
import { API_URL, readApiMessage } from "@/lib/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function normalizeAlunoPayload(aluno: Aluno) {
  return {
    id: aluno.id,
    nome: aluno.nome,
    idade: aluno.idade,
    cpf: aluno.cpf,
    email: aluno.email,
    cursos: (aluno.cursos ?? []).map((curso) => ({
      id: curso.id,
    })),
  };
}

async function fetchAlunoWithToken(id: number, token?: string) {
  return fetch(`${API_URL}/alunos/${id}`, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
    cache: "no-store",
  });
}

export async function getAluno(id: number) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;
  let response: Response;

  try {
    response = await fetchAlunoWithToken(id, token);
  } catch (error) {
    console.error("Erro ao buscar aluno:", error);
    throw new Error(`Nao foi possivel carregar os dados do aluno em ${API_URL}.`);
  }

  if (response.status === 401) {
    redirect("/login");
  }

  const data = await response.json();
  return data as Aluno;
}

export async function updateAluno(id: number, aluno: Aluno) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;
  let response: Response;

  try {
    response = await fetch(`${API_URL}/alunos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(normalizeAlunoPayload(aluno)),
    });
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    return error instanceof Error
      ? `Erro ao atualizar aluno: ${error.message}`
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
  return message || "Nao foi possivel salvar o aluno.";
}

export async function addCursoToAluno(id: number, cursoId: number) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;
  let response: Response;

  try {
    response = await fetch(`${API_URL}/alunos/${id}/matricula`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
      body: JSON.stringify({ cursoId }),
    });
  } catch (error) {
    console.error("Erro ao matricular aluno no curso:", error);
    return error instanceof Error
      ? `Erro ao matricular aluno no curso: ${error.message}`
      : `Nao foi possivel conectar ao backend em ${API_URL}.`;
  }

  if (response.status === 401) {
    redirect("/login");
  }

  if (response.status === 200) {
    revalidateTag("listar", "max");
    const data = await response.json();
    return data as Aluno;
  }

  const message = await readApiMessage(response);
  return message || "Nao foi possivel matricular o aluno no curso.";
}
