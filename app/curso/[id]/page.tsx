import { BookOpen, Clock3, GraduationCap, UserRound } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getCurso } from "./actions";

export default async function CursoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cursoId = Number(id);

  if (Number.isNaN(cursoId)) {
    notFound();
  }

  const curso = await getCurso(cursoId);

  if (!curso) {
    notFound();
  }

  return (
    <div className="page-shell screen flex items-center justify-center">
      <div className="panel max-w-5xl overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-sky-500 px-8 py-8 text-white">
          <p className="section-label text-white/80">Detalhes do curso</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">{curso.nome}</h1>
          <p className="mt-4 max-w-3xl text-white/85">{curso.descricao}</p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/90">
            <span className="rounded-full bg-white/15 px-3 py-1">
              Professor: {curso.professor || "Nao informado"}
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1">
              Carga horaria: {curso.cargaHoraria}h
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1">
              Alunos matriculados: {curso.alunos?.length ?? 0}
            </span>
          </div>
        </div>

        <div className="grid gap-6 p-8 md:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-[24px] border border-emerald-100 bg-emerald-50/70 p-6">
            <div className="mb-5 flex items-center gap-2 text-emerald-900">
              <BookOpen size={18} />
              <h2 className="text-xl font-semibold">Resumo</h2>
            </div>

            <div className="grid gap-4">
              <div className="list-card">
                <div className="flex items-center gap-2 text-slate-500">
                  <GraduationCap size={16} />
                  <span className="text-sm font-medium">Professor</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {curso.professor || "Nao informado"}
                </p>
              </div>

              <div className="list-card">
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock3 size={16} />
                  <span className="text-sm font-medium">Carga horaria</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {curso.cargaHoraria} horas
                </p>
              </div>

              <Link href="/cursos" className="button-secondary text-center">
                Voltar para cursos
              </Link>
            </div>
          </section>

          <section className="rounded-[24px] border border-slate-200 bg-slate-50 p-6">
            <div className="mb-5 flex items-center gap-2 text-slate-700">
              <UserRound size={18} />
              <h2 className="text-xl font-semibold">Alunos matriculados</h2>
            </div>

            <ul className="flex flex-col gap-3">
              {curso.alunos?.length ? (
                curso.alunos.map((aluno) => (
                  <li key={aluno.id} className="list-none">
                    <Link
                      href={`/aluno/${aluno.id}`}
                      className="list-card block hover:border-sky-200"
                    >
                      <p className="font-semibold text-slate-900">{aluno.nome}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Email: {aluno.email}
                      </p>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="message-muted">
                  Este curso ainda nao possui alunos matriculados.
                </li>
              )}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
