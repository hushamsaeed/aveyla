import { redirect } from "next/navigation";
import { login, verifySession } from "@/lib/auth";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await verifySession();
  if (session) redirect("/admin");

  const params = await searchParams;
  const hasError = params.error === "1";

  async function handleLogin(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const success = await login(email, password);
    if (success) redirect("/admin");
    redirect("/admin/login?error=1");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linen">
      <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-lg rounded-sm">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Admin Login
          </h1>
          <p className="mt-2 font-body text-sm text-driftwood">
            Aveyla Manta Village
          </p>
        </div>

        {hasError && (
          <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700">
            Invalid email or password. Please try again.
          </div>
        )}

        <form action={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block font-body text-sm font-medium text-dark-driftwood"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 w-full border border-gray-200 px-4 py-3 font-body text-sm outline-none focus:border-muted-ocean transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-body text-sm font-medium text-dark-driftwood"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 w-full border border-gray-200 px-4 py-3 font-body text-sm outline-none focus:border-muted-ocean transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-terracotta py-3 font-body text-sm font-semibold text-white hover:bg-terracotta/90 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
