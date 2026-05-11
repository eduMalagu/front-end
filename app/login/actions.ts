"use server";

import { API_URL } from "@/lib/api";
import { cookies } from "next/headers";

export async function loginAction(email: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/funcionarios/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha: password,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      const cookiesStore = await cookies();
      cookiesStore.set("access_token", data.access_token);
      return;
    }

    return data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return `Nao foi possivel conectar ao backend em ${API_URL}.`;
  }
}
