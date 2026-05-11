import Link from "next/link";

const cards = [
  {
    href: "/alunos",
    tag: "Gestao",
    title: "Alunos",
    text: "Veja a lista, abra detalhes e cadastre novos alunos.",
    action: "Abrir alunos",
    color: "text-sky-300",
    tagStyle: "bg-sky-400/15 text-sky-200",
    hover: "hover:border-sky-400/40",
  },
  {
    href: "/cursos",
    tag: "Catalogo",
    title: "Cursos",
    text: "Acesse a lista de cursos e crie novos cadastros com mais clareza.",
    action: "Abrir cursos",
    color: "text-emerald-300",
    tagStyle: "bg-emerald-400/15 text-emerald-200",
    hover: "hover:border-emerald-400/40",
  },
];

export default function Home() {
  return (
    <div className="page-shell screen flex items-center justify-center">
      <div className="hero-panel w-full max-w-6xl p-8 md:p-12">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />

        <p className="section-label relative text-sky-300">Painel da escola</p>
        <h1 className="relative mt-4 max-w-3xl text-4xl font-bold text-white md:text-6xl">
          Gerencie alunos e cursos de um jeito simples.
        </h1>
        <p className="relative mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Entre nas telas principais sem ficar perdido em menu e sem excesso de
          informacao.
        </p>

        <div className="relative mt-10 grid gap-5 md:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`card-link group ${card.hover}`}
            >
              <span
                className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${card.tagStyle}`}
              >
                {card.tag}
              </span>
              <h2 className="text-3xl font-semibold text-white">{card.title}</h2>
              <p className="mt-3 text-slate-300">{card.text}</p>
              <span
                className={`mt-6 inline-block text-sm font-medium transition group-hover:translate-x-1 ${card.color}`}
              >
                {card.action}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
