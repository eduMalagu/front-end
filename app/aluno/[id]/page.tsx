"use client";

import { getCursos } from "@/app/cursos/actions";
import { Aluno } from "@/interfaces/alunos";
import { CursoData } from "@/interfaces/cursos";
import { BookOpen, PenBox, UserRound } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAluno, updateAluno } from "./actions";

function normalizeCurso(curso: CursoData): CursoData {
  return {
    id: curso.id,
    nome: curso.nome,
    professor: curso.professor,
    cargaHoraria: curso.cargaHoraria,
    descricao: curso.descricao,
    createdAt: curso.createdAt,
    updatedAt: curso.updatedAt,
  };
}

export default function AlunoPage() {
  const { id } = useParams();
  const [aluno, setAluno] = useState({} as Aluno);
  const [cursos, setCursos] = useState<CursoData[]>([]);
  const [cursoSelecionadoId, setCursoSelecionadoId] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [alunoResponse, cursosResponse] = await Promise.all([
          getAluno(Number(id)),
          getCursos(),
        ]);

        setAluno(alunoResponse);
        setCursos(cursosResponse);
      } catch (loadError) {
        console.error(loadError);
        setError("Nao foi possivel carregar os dados do aluno.");
      }
    }

    loadData();
  }, [id]);

  const cursosDisponiveis = cursos.filter(
    (curso) => !aluno.cursos?.some((cursoAluno) => cursoAluno.id === curso.id)
  );

  async function handleAddCurso() {
    if (!cursoSelecionadoId) {
      setError("Selecione um curso para cadastrar no aluno.");
      return;
    }

    const cursoSelecionado = cursos.find(
      (curso) => curso.id === Number(cursoSelecionadoId)
    );

    if (!cursoSelecionado) {
      setError("Curso selecionado nao foi encontrado.");
      return;
    }

    setSaving(true);
    setError("");

    const response = await updateAluno(Number(id), {
      ...aluno,
      cursos: [
        ...(aluno.cursos ?? []).map(normalizeCurso),
        normalizeCurso(cursoSelecionado),
      ],
    });

    setSaving(false);

    if (response) {
      setError(
        typeof response === "string"
          ? response
          : "Nao foi possivel adicionar o curso ao aluno."
      );
      return;
    }

    try {
      const alunoAtualizado = await getAluno(Number(id));
      setAluno(alunoAtualizado);
      setCursoSelecionadoId("");
    } catch (loadError) {
      console.error(loadError);
      setError("Curso salvo, mas nao foi possivel recarregar o aluno.");
    }
  }

  return (
    <div className="page-shell screen flex items-center justify-center">
      <div className="panel max-w-4xl overflow-hidden">
        <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-emerald-500 px-8 py-8 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="section-label text-white/80">Perfil do aluno</p>
              <h1 className="mt-3 text-4xl font-bold">{aluno.nome}</h1>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/90">
                <span className="rounded-full bg-white/15 px-3 py-1">
                  CPF: {aluno.cpf}
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1">
                  Email: {aluno.email}
                </span>
              </div>
            </div>

            <Link
              href={`/aluno/${id}/editar`}
              className="rounded-full bg-white/15 p-3 transition hover:bg-white/25"
            >
              <PenBox />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 p-8 md:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[24px] border border-slate-200 bg-slate-50 p-6">
            <div className="mb-4 flex items-center gap-2 text-slate-700">
              <UserRound size={18} />
              <h2 className="text-xl font-semibold">Cursos do aluno</h2>
            </div>

            <ul className="flex flex-col gap-2">
              {aluno.cursos?.length ? (
                aluno.cursos.map((curso) => (
                  <li key={curso.id} className="list-card">
                    {curso.nome}
                  </li>
                ))
              ) : (
                <li className="message-muted">
                  Este aluno ainda nao tem cursos cadastrados.
                </li>
              )}
            </ul>
          </section>

          <section className="rounded-[24px] border border-emerald-100 bg-emerald-50/70 p-6">
            <div className="mb-4 flex items-center gap-2 text-emerald-800">
              <BookOpen size={18} />
              <h2 className="text-xl font-semibold">Adicionar curso</h2>
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="curso" className="font-medium text-slate-700">
                Selecione um curso
              </label>

              <select
                id="curso"
                value={cursoSelecionadoId}
                onChange={(e) => setCursoSelecionadoId(e.target.value)}
                className="field field-green"
                disabled={saving || cursosDisponiveis.length === 0}
              >
                <option value="">Selecione um curso</option>
                {cursosDisponiveis.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    {curso.nome}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleAddCurso}
                disabled={saving || cursosDisponiveis.length === 0}
                className="button-secondary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Salvando..." : "Adicionar curso"}
              </button>

              {cursosDisponiveis.length === 0 && (
                <p className="message-muted text-sm">
                  Este aluno ja esta cadastrado em todos os cursos disponiveis.
                </p>
              )}

              {error && <p className="message-error text-sm">{error}</p>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
