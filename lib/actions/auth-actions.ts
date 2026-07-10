"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { createSession, destroySession } from "@/lib/auth";

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "Email y contraseña obligatorios." };

  const user = await db.user.findUnique({ where: { email } });
  // Comparación siempre, exista o no el usuario (timing uniforme)
  const hash =
    user?.passwordHash ??
    "$2a$12$C6UzMDM.H6dfI/f/IKcEeO7ZDLQzY8mPZg1Ss/6uJ0v1n2ZUFVVVe";
  const valid = await bcrypt.compare(password, hash);

  if (!user || !valid) return { error: "Credenciales incorrectas." };

  await createSession(user.id, user.email);
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
