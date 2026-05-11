import CursoItem from "@/components/CursoItem";
import Link from "next/link";

import { getCursos } from "./actions";

export default async function CursosPage() {
  const cursos = await getCursos();

  return (
    <div className="page-shell screen flex flex-col items-center text-white">
      <div className="mb-8 w-full max-w-5xl">
        <p className="section-label text-emerald-300">Cursos</p>
        <h1 className="mt-3 text-4xl font-bold tracking-wide md:text-5xl">
          Lista de cursos
        </h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Consulte os cursos de forma mais direta e entre no cadastro sem uma
          tela carregada.
        </p>
      </div>

      <div className="panel h-100 max-w-5xl overflow-auto p-4">
        <ul className="flex flex-col gap-2">
          {cursos.map((curso: { id: number; nome: string }) => (
            <CursoItem key={curso.id} nome={curso.nome} id={curso.id} />
          ))}
        </ul>
      </div>

      <Link href="/curso/cadastro" className="button-secondary mt-6">
        Cadastrar curso
      </Link>
    </div>
  );
}
