export default function AlunosPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Lista da sala
        </h1>

        <p className="mb-2 text-sm font-medium text-gray-700">
          Lista de alunos
        </p>

        <p className="mb-6 text-sm text-gray-600">
          Alunos cadastrados na turma:
        </p>

        <ul className="space-y-3">
          <li className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-gray-700">
            Aluno 1
          </li>
          <li className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-gray-700">
            Aluno 2
          </li>
          <li className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-gray-700">
            Aluno 3
          </li>
        </ul>
      </div>
    </main>
  );
}
