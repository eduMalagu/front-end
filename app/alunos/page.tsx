import AlunoItem from "@/components/AlunoItem";
import Link from "next/link";

import { getAlunos } from "./actions";

export default async function AlunosPage() {
  const alunos = await getAlunos();

  return (
    <div className="page-shell screen flex flex-col items-center text-white">
      <div className="mb-8 w-full max-w-5xl">
        <p className="section-label text-sky-300">Alunos</p>
        <h1 className="mt-3 text-4xl font-bold tracking-wide md:text-5xl">
          Lista de alunos
        </h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Acompanhe os cadastros e entre nos detalhes de cada aluno com um
          visual mais limpo.
        </p>
      </div>

      <div className="panel h-100 max-w-5xl overflow-auto p-4">
        <ul className="flex flex-col gap-2">
          {alunos.map((aluno) => (
            <AlunoItem key={aluno.id} nome={aluno.nome} id={aluno.id} />
          ))}
        </ul>
      </div>

      <Link href="/aluno/cadastro" className="button-primary mt-6">
        Cadastrar aluno
      </Link>
    </div>
  );
}
