"use client";

import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";
import { createCurso } from "./actions";

export default function CursoCadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [professor, setProfessor] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (!nome.trim() || !descricao.trim() || !cargaHoraria.trim()) {
      setError("Preencha nome, carga horaria e descricao.");
      return;
    }

    const cargaHorariaNumero = Number(cargaHoraria);

    if (Number.isNaN(cargaHorariaNumero) || cargaHorariaNumero <= 0) {
      setError("Informe uma carga horaria valida.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    const response = await createCurso({
      nome: nome.trim(),
      professor: professor.trim() || undefined,
      cargaHoraria: cargaHorariaNumero,
      descricao: descricao.trim(),
    });

    setIsSubmitting(false);

    if (!response) {
      setNome("");
      setProfessor("");
      setCargaHoraria("");
      setDescricao("");
      router.push("/cursos");
      return;
    }

    setError(typeof response === "string" ? response : "Erro ao cadastrar curso.");
  }

  return (
    <div className="page-shell screen flex items-center justify-center">
      <div className="form-card max-w-2xl">
        <p className="section-label text-emerald-600">Novo cadastro</p>
        <h1 className="mb-2 mt-3 text-4xl font-bold text-slate-900 md:text-5xl">
          Cadastrar curso
        </h1>
        <p className="mb-6 text-slate-600">
          Crie um curso para depois vincular aos alunos na tela de detalhes.
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="field field-green"
            type="text"
            placeholder="Nome do curso"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            className="field field-green"
            type="text"
            placeholder="Professor"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
          />
          <input
            className="field field-green"
            type="number"
            placeholder="Carga horaria"
            value={cargaHoraria}
            onChange={(e) => setCargaHoraria(e.target.value)}
          />
          <textarea
            className="field field-green min-h-36"
            placeholder="Descricao do curso"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          {error && (
            <p className="message-error text-sm">{error}</p>
          )}

          <button className="button-secondary mt-2 disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
