"use client";

import { SubmitEvent, useState } from "react";
import { createAluno } from "./actions";
import { useRouter } from "next/navigation";

export default function AlunoCadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (!nome.trim() || !idade.trim() || !cpf.trim() || !email.trim()) {
      setError("Preencha todos os campos.");
      return;
    }

    const response = await createAluno({
      nome: nome.trim(),
      idade: Number(idade),
      cpf: cpf.trim(),
      email: email.trim(),
    });

    if (!response) {
      setNome("");
      setIdade("");
      setCpf("");
      setEmail("");
      setError("");
      router.push("/alunos");
      return;
    }

    setError(response);
  }

  return (
    <div className="page-shell screen flex items-center justify-center">
      <div className="form-card max-w-xl">
        <p className="section-label text-sky-600">Novo aluno</p>
        <h1 className="mb-2 mt-3 text-4xl font-bold text-slate-900">
          Cadastrar aluno
        </h1>
        <p className="mb-6 text-slate-600">
          Preencha os dados principais para incluir um novo aluno no sistema.
        </p>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            className="field"
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            className="field"
            type="number"
            placeholder="Idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
          <input
            className="field"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <input
            className="field"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className="message-error text-sm">{error}</p>}

          <button className="button-primary mt-2" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
