"use client";

import { Aluno } from "@/interfaces/alunos";
import { useParams, useRouter } from "next/navigation";
import { SubmitEvent, useEffect, useState } from "react";
import { getAluno, updateAluno } from "../actions";

export default function AlunoEditarPage() {
  const { id } = useParams();
  const router = useRouter();
  const [aluno, setAluno] = useState({} as Aluno);
  const [error, setError] = useState("");

  useEffect(() => {
    getAluno(Number(id)).then((response) => setAluno(response));
  }, [id]);

  function handleChange(valor: string, campo: keyof Aluno) {
    setAluno((estadoAtual) => ({ ...estadoAtual, [campo]: valor }));
  }

  async function handleUpdate(event: SubmitEvent) {
    event.preventDefault();

    const response = await updateAluno(Number(id), aluno);

    if (response) {
      setError(response);
      return;
    }

    router.push(`/aluno/${id}`);
  }

  return (
    <div className="page-shell screen flex items-center justify-center">
      <form className="form-card max-w-xl" onSubmit={handleUpdate}>
        <p className="section-label text-sky-600">Editar aluno</p>
        <h1 className="mb-2 mt-3 text-4xl font-bold text-slate-900">
          Atualizar cadastro
        </h1>
        <p className="mb-6 text-slate-600">
          Ajuste os dados do aluno sem sair da estrutura principal do sistema.
        </p>

        <div className="flex flex-col gap-4">
          <input
            value={aluno.nome ?? ""}
            onChange={(e) => handleChange(e.target.value, "nome")}
            className="field"
            placeholder="Nome"
          />
          <input
            value={aluno.cpf ?? ""}
            onChange={(e) => handleChange(e.target.value, "cpf")}
            className="field"
            placeholder="CPF"
          />
          <input
            value={aluno.email ?? ""}
            onChange={(e) => handleChange(e.target.value, "email")}
            className="field"
            placeholder="Email"
          />

          {error && <p className="message-error text-sm">{error}</p>}

          <button className="button-primary mt-2" type="submit">
            Salvar alteracoes
          </button>
        </div>
      </form>
    </div>
  );
}
