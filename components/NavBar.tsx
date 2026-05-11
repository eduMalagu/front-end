import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/alunos", label: "Alunos" },
  { href: "/cursos", label: "Cursos" },
];

export default function NavBar() {
  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-[0.16em] text-white">
          Escola App
        </Link>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-sm text-slate-200">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
