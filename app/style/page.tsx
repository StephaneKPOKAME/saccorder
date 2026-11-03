function SectionLabel({ children }: { children: string }) {
  return <p className="text-label uppercase text-text-3">{children}</p>;
}

const THEME_COLORS = [
  { name: "Menthe", className: "bg-mint" },
  { name: "Bleuet", className: "bg-bluet" },
  { name: "Abricot", className: "bg-abricot" },
  { name: "Lilas", className: "bg-lilas" },
  { name: "Blé", className: "bg-ble" },
];

export default function StyleGuide() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-14 px-6 py-16">
      <header className="flex flex-col gap-2">
        <SectionLabel>Identité — version calme</SectionLabel>
        <h1 className="font-display text-title text-text">Guide de style</h1>
        <p className="text-body text-text-2">
          Composants de base de S&apos;accorder, écrans de travail (surfaces solides, peu
          d&apos;animation).
        </p>
        <p className="text-sm text-text-3">
          <span className="font-display">Unbounded</span> — titres ·{" "}
          <span className="font-sans">Onest</span> — texte ·{" "}
          <span className="font-logo">Outfit</span> — logo
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <SectionLabel>Couleurs de thème</SectionLabel>
        <div className="flex flex-wrap gap-4">
          {THEME_COLORS.map((color) => (
            <div key={color.name} className="flex items-center gap-2">
              <span className={`h-6 w-6 rounded-pill ${color.className}`} />
              <span className="text-sm text-text-2">{color.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabel>Boutons</SectionLabel>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            className="inline-flex items-center gap-3 rounded-pill bg-text py-2 pr-2 pl-6 text-body font-medium text-bg transition hover:bg-white focus:outline-none focus:shadow-halo-lg"
          >
            Bouton primaire
            <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-mint text-bg">
              →
            </span>
          </button>
          <button
            type="button"
            className="rounded-pill border border-border-strong bg-transparent px-6 py-3 text-body font-medium text-text transition focus:outline-none focus:shadow-halo-lg"
          >
            Bouton secondaire
          </button>
          <button
            type="button"
            className="rounded-pill bg-mint px-6 py-3 text-body font-medium text-bg transition focus:outline-none focus:shadow-halo-lg"
          >
            Bouton accent
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabel>Champ</SectionLabel>
        <div className="flex max-w-sm flex-col gap-2">
          <label htmlFor="prenom" className="text-label uppercase text-text-3">
            Prénom
          </label>
          <input
            id="prenom"
            type="text"
            placeholder="Claude"
            className="rounded-xs border border-border bg-surface-2 px-4 py-3 text-body text-text outline-none transition placeholder:text-text-3 focus:border-mint focus:shadow-halo"
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabel>Option de choix unique</SectionLabel>
        <div className="flex max-w-sm flex-col gap-3">
          <button
            type="button"
            className="rounded-xs bg-mint px-4 py-3 text-left text-body font-medium text-bg transition focus:outline-none focus:shadow-halo-lg"
          >
            Principalement à l&apos;écrit
          </button>
          <button
            type="button"
            className="rounded-xs border border-border bg-surface-2 px-4 py-3 text-left text-body text-text transition focus:outline-none focus:shadow-halo"
          >
            Principalement à l&apos;oral
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabel>Tuile personne</SectionLabel>
        <button
          type="button"
          className="flex max-w-sm items-center gap-3 rounded-sm border border-border bg-surface-1 px-4 py-3 text-left transition hover:border-border-strong focus:outline-none focus:shadow-halo"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-bluet text-sm font-semibold text-bg">
            CM
          </span>
          <span className="flex flex-col">
            <span className="text-body text-text">Claude M.</span>
            <span className="text-sm text-text-2">Product Designer</span>
          </span>
        </button>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabel>Badge</SectionLabel>
        <span className="inline-flex w-fit items-center rounded-pill border border-abricot/40 bg-abricot/15 px-3 py-1 text-label uppercase text-abricot">
          À creuser
        </span>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabel>Barre de tendance</SectionLabel>
        <div className="flex max-w-sm flex-col gap-3">
          <p className="text-body text-text">En combinant les deux selon le contexte</p>
          <div className="h-2 w-full rounded-pill bg-white/10">
            <div className="h-2 w-3/5 rounded-pill bg-mint" />
          </div>
          <p className="text-sm leading-relaxed text-text-2">60 % (3)</p>
        </div>
      </section>
    </main>
  );
}
