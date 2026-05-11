"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  onSend: (email: string, password: string) => Promise<void | string>;
}

export default function LoginForm({ onSend }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await onSend(email, password);

    if (response) {
      alert(response);
      return;
    }

    router.push("/");
  }

  return (
    <form className="form-card max-w-md" onSubmit={handleSubmit}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Entrar</h2>
        <p className="mt-2 text-slate-600">
          Use seu email e sua senha para acessar o sistema.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="button-primary mt-2" type="submit">
          Entrar
        </button>
      </div>
    </form>
  );
}
