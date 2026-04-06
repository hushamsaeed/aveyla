import { SignJWT, jwtVerify } from "jose";
import { hash, compare } from "bcryptjs";
import { cookies } from "next/headers";
import { getUserByEmail } from "@/lib/data/users";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "aveyla-dev-secret-change-me");
const COOKIE_NAME = "admin_session";

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}

export async function createSession(userId: number, email: string, role: string): Promise<string> {
  const token = await new SignJWT({ userId, email, role })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .setIssuedAt()
    .sign(SECRET);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  return token;
}

export async function verifySession(): Promise<{ userId: number; email: string; role: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as { userId: number; email: string; role: string };
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<{ userId: number; email: string; role: string }> {
  const session = await verifySession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function login(email: string, password: string): Promise<boolean> {
  const user = await getUserByEmail(email);
  if (!user) return false;

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return false;

  await createSession(user.id, user.email, user.role || "admin");
  return true;
}
