"use client";

import { Curso } from "@/interfaces/cursos";
import { useParams, useRouter } from "next/navigation";
import { SubmitEvent, useEffect, useState } from "react";
import { getCurso, updateCurso } from "../actions";

export default function CursoEditarPage() {
  const { id } = useParams();
  const router = useRouter();
  const [curso, setCurso] = useState({} as Curso);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadCurso() {
      try {
        const response = await getCurso(Number(id));

        if (!response) {
          setError("Nao foi possivel carregar os dados do curso.");
          return;
        }

        setCurso(response);
      } catch (loadError) {
        console.error(loadError);
        setError("Nao foi possivel carregar os dados do curso.");
      } finally {
        setLoading(false);
      }
    }

    loadCurso();
  }, [id]);

  function handleChange(
    valor: string,
    campo: "nome" | "professor" | "cargaHoraria" | "descricao"
  ) {
    setCurso((estadoAtual) => ({
      ...estadoAtual,
      [campo]: campo === "cargaHoraria" ? Number(valor) : valor,
    }));
  }

  async function handleUpdate(event: SubmitEvent) {
    event.preventDefault();

    if (!curso.nome?.trim() || !curso.descricao?.trim()) {
      setError("Preencha nome e descricao do curso.");
      return;
    }

    if (!curso.cargaHoraria || curso.cargaHoraria <= 0) {
      setError("Informe uma carga horaria valida.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const response = await updateCurso(Number(id), {
      nome: curso.nome.trim(),
      professor: curso.professor?.trim() || undefined,
      cargaHoraria: Number(curso.cargaHoraria),
      descricao: curso.descricao.trim(),
    });

    setIsSubmitting(false);

    if (response) {
      setError(response);
      return;
    }

    router.push(`/curso/${id}`);
  }

  return (
    <div className="page-shell screen flex items-center justify-center">
      <form className="form-card max-w-2xl" onSubmit={handleUpdate}>
        <p className="section-label text-emerald-600">Editar curso</p>
        <h1 className="mb-2 mt-3 text-4xl font-bold text-slate-900">
          Atualizar curso
        </h1>
        <p className="mb-6 text-slate-600">
          Revise nome, professor, carga horaria e descricao do curso.
        </p>

        <div className="flex flex-col gap-4">
          <input
            value={curso.nome ?? ""}
            onChange={(e) => handleChange(e.target.value, "nome")}
            className="field field-green"
            placeholder="Nome do curso"
            disabled={loading || isSubmitting}
          />
          <input
            value={curso.professor ?? ""}
            onChange={(e) => handleChange(e.target.value, "professor")}
            className="field field-green"
            placeholder="Professor"
            disabled={loading || isSubmitting}
          />
          <input
            value={curso.cargaHoraria ?? ""}
            onChange={(e) => handleChange(e.target.value, "cargaHoraria")}
            className="field field-green"
            placeholder="Carga horaria"
            type="number"
            min="1"
            disabled={loading || isSubmitting}
          />
          <textarea
            value={curso.descricao ?? ""}
            onChange={(e) => handleChange(e.target.value, "descricao")}
            className="field field-green min-h-36"
            placeholder="Descricao do curso"
            disabled={loading || isSubmitting}
          />

          {error && <p className="message-error text-sm">{error}</p>}

          <button
            className="button-secondary mt-2 disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={loading || isSubmitting}
          >
            {isSubmitting ? "Salvando..." : "Salvar alteracoes"}
          </button>
        </div>
      </form>
    </div>
  );
}
