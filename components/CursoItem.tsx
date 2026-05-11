"use client";

import { deleteCurso } from "@/app/cursos/actions";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  nome: string;
}

export default function CursoItem({ id, nome }: Props) {
  const router = useRouter();

  async function handleDelete() {
    await deleteCurso(id);
    router.refresh();
  }

  return (
    <li className="list-none">
      <div className="list-card flex items-center justify-between hover:border-emerald-200">
        <Link
          href={`/curso/${id}`}
          className="font-medium text-slate-800 transition hover:text-emerald-600"
        >
          {nome}
        </Link>

        <button
          className="button-danger rounded-full p-2"
          onClick={handleDelete}
        >
          <Trash size={18} />
        </button>
      </div>
    </li>
  );
}
