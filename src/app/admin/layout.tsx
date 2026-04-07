import { redirect } from "next/navigation";
import { verifySession, logout } from "@/lib/auth";
import Link from "next/link";

const SIDEBAR_LINKS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Hero Media", href: "/admin/hero-media" },
  { label: "Rooms", href: "/admin/rooms" },
  { label: "Activities", href: "/admin/activities" },
  { label: "Packages", href: "/admin/packages" },
  { label: "Gallery", href: "/admin/gallery" },
  { label: "Reviews", href: "/admin/reviews" },
  { label: "FAQ", href: "/admin/faq" },
  { label: "Notices", href: "/admin/notices" },
  { label: "SEO", href: "/admin/seo" },
  { label: "Navigation", href: "/admin/navigation" },
  { label: "Settings", href: "/admin/settings" },
  { label: "Pages", href: "/admin/pages" },
  { label: "Users", href: "/admin/users" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  // If not authenticated, render children directly (login page)
  // Middleware handles redirecting non-login pages
  if (!session) {
    return <>{children}</>;
  }

  async function handleLogout() {
    "use server";
    await logout();
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-linen">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-dark-driftwood text-white flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="font-display text-lg font-semibold text-white">
            Aveyla
          </div>
          <div className="font-body text-xs text-white/50 mt-0.5">
            Admin Panel
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {SIDEBAR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 rounded-sm font-body text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <div className="px-3 py-1 mb-2">
            <p className="font-body text-xs text-white/40">Signed in as</p>
            <p className="font-body text-xs text-white/70 truncate">
              {session.email}
            </p>
          </div>
          <form action={handleLogout}>
            <button
              type="submit"
              className="w-full px-3 py-2 rounded-sm font-body text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors text-left"
            >
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  );
}
