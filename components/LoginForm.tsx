"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  onSend: (email: string, password: string) => Promise<void | string>;
}

export default function LoginForm({ onSend }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    const response = await onSend(email, password);

    if (response) {
      alert(response);
      return;
    }

    router.push("/");
  }

  return (
    <div className="w-[90%] h-100 bg-white rounded-md shadow-md shadow-white text-black py-28 px-10 overflow-auto flex flex-col items-center justify-between">
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        className="w-full border border-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-black text-white rounded-xl px-10 py-2 cursor-pointer hover:opacity-80"
        onClick={handleSubmit}
      >
        Entrar
      </button>
    </div>
  );
}
