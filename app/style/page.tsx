function SectionLabel({ children }: { children: string }) {
  return <p className="text-label uppercase text-muted">{children}</p>;
}

export default function StyleGuide() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-14 px-6 py-16">
      <header className="flex flex-col gap-2">
        <SectionLabel>Identité</SectionLabel>
        <h1 className="text-title">Guide de style</h1>
        <p className="text-body text-text-2">
          Composants de base de S&apos;accorder, à la bonne identité.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <SectionLabel>Boutons</SectionLabel>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            className="rounded-pill bg-deep-green px-6 py-3 text-body font-medium text-white shadow-soft transition focus:outline-none focus:shadow-halo-lg"
          >
            Bouton primaire
          </button>
          <button
            type="button"
            className="rounded-pill border border-border bg-transparent px-6 py-3 text-body font-medium text-deep-green shadow-soft transition focus:outline-none focus:shadow-halo-lg"
          >
            Bouton secondaire
          </button>
          <button
            type="button"
            className="rounded-pill bg-mint px-6 py-3 text-body font-medium text-deep-green shadow-soft transition focus:outline-none focus:shadow-halo-lg"
          >
            Bouton accent
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabel>Champ</SectionLabel>
        <div className="flex max-w-sm flex-col gap-2">
          <label htmlFor="prenom" className="text-label uppercase text-muted">
            Prénom
          </label>
          <input
            id="prenom"
            type="text"
            placeholder="Claude"
            className="rounded-control border border-border bg-white px-4 py-3 text-body text-deep-green outline-none transition placeholder:text-text-2 focus:border-mint focus:shadow-halo"
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabel>Option de choix unique</SectionLabel>
        <div className="flex max-w-sm flex-col gap-3">
          <button
            type="button"
            className="rounded-control bg-deep-green px-4 py-3 text-left text-body text-white transition focus:outline-none focus:shadow-halo-lg"
          >
            Principalement à l&apos;écrit
          </button>
          <button
            type="button"
            className="rounded-control border border-border px-4 py-3 text-left text-body text-deep-green transition focus:outline-none focus:shadow-halo"
          >
            Principalement à l&apos;oral
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabel>Carte</SectionLabel>
        <div className="max-w-sm rounded-card border border-border bg-white p-6 shadow-soft">
          <p className="text-label uppercase text-muted">Collaborateur</p>
          <p className="mt-1 text-title">Claude M.</p>
          <p className="text-body text-text-2">Product Designer</p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabel>Badge</SectionLabel>
        <span className="inline-flex w-fit items-center rounded-pill bg-mint-100 px-3 py-1 text-label uppercase text-muted">
          À creuser
        </span>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabel>Barre de tendance</SectionLabel>
        <div className="flex max-w-sm flex-col gap-2">
          <p className="text-body text-deep-green">En combinant les deux selon le contexte</p>
          <div className="h-2 w-full rounded-pill bg-mint-50">
            <div className="h-2 w-3/5 rounded-pill bg-green" />
          </div>
          <p className="text-label text-muted">60 % (3)</p>
        </div>
      </section>
    </main>
  );
}
