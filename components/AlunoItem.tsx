"use client";

import Link from "next/link";
import { Trash } from "lucide-react";
import { deleteAluno } from "@/app/alunos/actions";

interface Props {
  id: number;
  nome: string;
}

export default function AlunoItem({ id, nome }: Props) {
  return (
    <div className="w-full h-10 flex items-center justify-start border-b border-gray-300">
    <Link href={`/aluno/${id}`}>
      <li>{nome}</li>
    </Link>
    <button className="text-red-500" onClick={() => deleteAluno(id)}>
      <Trash />
    </button>
  </div>
);
}
