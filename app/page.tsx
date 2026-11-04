import Link from "next/link";
import { Logo, Wordmark } from "@/components/logo";

type Halo = {
  color: string;
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  opacity: number;
  duration: number;
  delay?: number;
};

function HaloField({ halos }: { halos: Halo[] }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
    >
      {halos.map((halo, index) => (
        <div
          key={index}
          className="absolute rounded-full blur-[40px]"
          style={{
            width: halo.size,
            height: halo.size,
            top: halo.top,
            left: halo.left,
            right: halo.right,
            bottom: halo.bottom,
            background: `radial-gradient(circle, ${halo.color} 0%, ${halo.color}00 68%)`,
            opacity: halo.opacity,
            animation: `sa-drift ${halo.duration}s ease-in-out ${halo.delay ?? 0}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-4 w-7 border-l border-t border-white/[.28]" />
      <span className="text-label uppercase text-text-2">{children}</span>
      <span className="h-1.5 w-1.5 rounded-pill bg-mint shadow-[0_0_10px_#58e8a8]" />
    </div>
  );
}

function PrimaryCTA({ children, className = "" }: { children: string; className?: string }) {
  return (
    <Link
      href="/connexion"
      className={`inline-flex items-center gap-3 rounded-pill bg-text py-[7px] pr-[7px] pl-6 text-base font-medium text-bg transition hover:bg-white focus:outline-none focus:shadow-halo-lg ${className}`}
    >
      {children}
      <span className="flex h-10 w-10 items-center justify-center rounded-pill bg-mint text-lg text-bg">
        →
      </span>
    </Link>
  );
}

function GhostCTA({ children, href = "#comment-ca-marche" }: { children: string; href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex h-[54px] items-center rounded-pill border border-white/[.14] bg-white/5 px-6 text-base font-medium text-text transition [backdrop-filter:blur(18px)] hover:bg-white/10"
    >
      {children}
    </Link>
  );
}

const THEME_HEX: Record<string, string> = {
  mint: "#58e8a8",
  bluet: "#8fa9e8",
  abricot: "#f5a97f",
  lilas: "#c0b0e8",
  ble: "#e8d67a",
};

function Dot({ color, size = 8, glow = false }: { color: string; size?: number; glow?: boolean }) {
  return (
    <span
      className="inline-block shrink-0 rounded-pill"
      style={{
        width: size,
        height: size,
        background: color,
        boxShadow: glow ? `0 0 12px ${color}` : undefined,
      }}
    />
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-6 overflow-x-hidden pb-6">
      {/* Navigation */}
      <header className="mx-auto flex w-full max-w-[1320px] flex-wrap items-center justify-between gap-4 px-6 pt-5">
        <Wordmark logoSize={36} />
        <nav className="flex flex-wrap gap-1 rounded-pill border border-border bg-surface-2 p-1.5">
          <span className="rounded-pill bg-text px-[18px] py-2.5 text-sm font-medium text-bg">
            L&apos;outil
          </span>
          <a
            href="#comment-ca-marche"
            className="rounded-pill px-[18px] py-2.5 text-sm text-text-2 transition hover:bg-surface-3 hover:text-text"
          >
            Comment ça marche
          </a>
          <a
            href="#confiance"
            className="rounded-pill px-[18px] py-2.5 text-sm text-text-2 transition hover:bg-surface-3 hover:text-text"
          >
            Pour les managers
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/connexion" className="text-sm text-text-2 transition hover:text-text">
            Se connecter
          </Link>
          <Link
            href="/connexion"
            className="flex items-center gap-2.5 rounded-pill bg-text py-1.5 pr-[18px] pl-1.5 text-sm font-medium text-bg transition hover:bg-white"
          >
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-pill bg-mint text-base text-bg">
              →
            </span>
            Essayer
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto w-full max-w-[1320px] px-6">
        <div className="relative min-h-[560px] overflow-hidden rounded-2xl border border-white/[.06] bg-surface-1 sm:min-h-[680px]">
          <HaloField
            halos={[
              { color: THEME_HEX.bluet, size: 520, top: "-180px", right: "-60px", opacity: 0.32, duration: 16 },
              { color: THEME_HEX.lilas, size: 440, bottom: "-160px", right: "18%", opacity: 0.3, duration: 18, delay: -6 },
              { color: THEME_HEX.abricot, size: 300, top: "18%", right: "30%", opacity: 0.16, duration: 20, delay: -3 },
            ]}
          />
          <div className="relative flex min-h-[560px] flex-col justify-end gap-9 p-7 sm:min-h-[680px] sm:p-12 lg:p-16">
            <div className="inline-flex w-fit items-center gap-2.5 rounded-pill border border-white/[.12] bg-white/[.06] py-2 pr-4 pl-2 text-sm font-medium shadow-[inset_0_1px_0_rgba(255,255,255,.1)] [backdrop-filter:blur(18px)]">
              <span className="rounded-pill bg-text px-[11px] py-[5px] text-[11px] font-semibold uppercase tracking-[.12em] text-bg">
                Nouveau
              </span>
              Les cartes collaboratives
            </div>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div className="flex max-w-[780px] flex-col gap-6">
                <h1 className="text-balance font-display text-[clamp(34px,5vw,68px)] font-medium leading-[1.04] tracking-[-.035em] text-text">
                  Chacun travaille à sa façon.{" "}
                  <span className="text-text-2">Accordez-vous sur l&apos;essentiel.</span>
                </h1>
                <p className="max-w-[560px] text-pretty text-[clamp(16px,1.4vw,19px)] leading-relaxed text-text-2">
                  Chacun exprime sa façon de travailler et ses besoins. L&apos;outil fait ressortir
                  les points communs et les frictions, puis aide votre équipe à en tirer des
                  règles claires, acceptées par tous.
                </p>
                <div className="flex flex-wrap gap-3">
                  <PrimaryCTA>Créer la carte de mon équipe</PrimaryCTA>
                  <GhostCTA>Voir un exemple</GhostCTA>
                </div>
              </div>
              <div className="flex w-[300px] max-w-full flex-col gap-3">
                <div className="ml-9 flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/5 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_24px_48px_rgba(0,0,0,.35)] [backdrop-filter:blur(24px)_saturate(140%)]">
                  <Dot color={THEME_HEX.bluet} />
                  <span className="text-[13px] text-text-2">Rythmes</span>
                  <span className="ml-auto text-sm font-medium text-text">5 sur 6 en phase</span>
                </div>
                <div className="rounded-xs border border-white/[.12] bg-white/[.06] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.1),0_24px_48px_rgba(0,0,0,.4)] [backdrop-filter:blur(24px)_saturate(140%)]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[13px] text-text-2">
                      <Dot color={THEME_HEX.abricot} />
                      Feedback
                    </span>
                    <span className="text-xs text-text-3">6 cartes</span>
                  </div>
                  <p className="mt-4 text-[19px] font-medium leading-tight tracking-[-.01em] text-text">
                    4 personnes sur 6 préfèrent en parler tout de suite.
                  </p>
                  <div className="mt-4 h-1.5 rounded-pill bg-white/10">
                    <div className="h-1.5 w-3/5 rounded-pill bg-text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Le constat */}
      <section className="mx-auto flex w-full max-w-[1320px] flex-col gap-11 px-6 pt-20">
        <Eyebrow>Le constat</Eyebrow>
        <p className="max-w-[1100px] text-pretty font-display text-[clamp(24px,3vw,42px)] font-normal leading-[1.25] tracking-[-.025em] text-text">
          <span className="text-[#6b7471]">
            Les frictions viennent rarement des personnes. Elles viennent de ce qui n&apos;a
            jamais été dit :
          </span>{" "}
          les rythmes, la communication, le feedback, la façon de décider.
        </p>
        <div className="relative -mx-7 grid grid-cols-1 items-start gap-5 overflow-hidden p-7 sm:grid-cols-2 lg:grid-cols-3">
          <HaloField
            halos={[
              { color: THEME_HEX.lilas, size: 340, top: "-80px", left: "-60px", opacity: 0.3, duration: 15 },
              { color: THEME_HEX.abricot, size: 280, bottom: "-80px", right: "-60px", opacity: 0.24, duration: 17, delay: -5 },
            ]}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-7 right-7 top-1/2 hidden border-t border-dashed border-white/[.12] sm:block"
          />
          <div className="relative overflow-hidden rounded-md border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_24px_48px_rgba(0,0,0,.35)] [backdrop-filter:blur(24px)_saturate(140%)]">
            <div className="pointer-events-none absolute right-5 top-2 font-display text-[76px] leading-none text-white/5">
              01
            </div>
            <div className="relative flex items-center gap-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xs border border-white/[.08] bg-surface-3">
                <Dot color={THEME_HEX.lilas} size={10} glow />
              </span>
              <div>
                <p className="text-lg font-medium text-text">Carte anonyme</p>
                <p className="mt-0.5 text-[13px] text-text-3">[ Pôle client · Décision ]</p>
              </div>
            </div>
            <p className="relative mt-6 text-pretty text-[19px] leading-relaxed text-[#d6dbd9]">
              « Je préfère qu&apos;on me prévienne{" "}
              <span className="font-medium text-lilas">dès qu&apos;un changement est envisagé</span>
              . »
            </p>
            <p className="relative mt-5 text-[13px] text-text-3">Besoin exprimé · Décision</p>
          </div>

          <div className="relative mt-16 overflow-hidden rounded-md border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_24px_48px_rgba(0,0,0,.35)] [backdrop-filter:blur(24px)_saturate(140%)]">
            <div className="pointer-events-none absolute right-5 top-2 font-display text-[76px] leading-none text-white/5">
              02
            </div>
            <div className="relative flex items-center gap-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xs border border-white/[.08] bg-surface-3">
                <Dot color={THEME_HEX.bluet} size={10} glow />
              </span>
              <div>
                <p className="text-lg font-medium text-text">Carte anonyme</p>
                <p className="mt-0.5 text-[13px] text-text-3">[ Pôle client · Rythmes ]</p>
              </div>
            </div>
            <p className="relative mt-6 text-pretty text-[19px] leading-relaxed text-[#d6dbd9]">
              « J&apos;ai besoin de{" "}
              <span className="font-medium text-bluet">matinées sans réunion</span> pour avancer. »
            </p>
            <p className="relative mt-5 text-[13px] text-text-3">Besoin exprimé · Rythmes</p>
          </div>

          <div className="relative mt-6 flex flex-col gap-6 overflow-hidden rounded-md border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_24px_48px_rgba(0,0,0,.35)] [backdrop-filter:blur(24px)_saturate(140%)]">
            <div className="flex items-center justify-between">
              <p className="text-label uppercase text-text-2">Point de friction</p>
              <span className="flex gap-1.5">
                <span className="h-1 w-[18px] rounded-pill bg-abricot" />
                <span className="h-1 w-2.5 rounded-pill bg-white/[.18]" />
                <span className="h-1 w-2.5 rounded-pill bg-white/[.18]" />
              </span>
            </div>
            <p className="font-display text-[56px] font-normal leading-none tracking-[-.04em] text-text">
              2<span className="text-[#6b7471]">/6</span>
            </p>
            <p className="text-pretty text-base leading-relaxed text-text-2">
              veulent des réunions le matin. S&apos;accorder rend l&apos;écart visible pour que
              l&apos;équipe en parle, sans chercher de coupable.
            </p>
            <div className="flex items-center justify-between gap-3 rounded-sm border border-white/[.08] bg-white/[.04] py-3.5 pr-3.5 pl-4">
              <div>
                <p className="text-xs text-text-3">Atelier d&apos;équipe · 45 min</p>
                <p className="mt-0.5 text-[15px] font-medium text-text">
                  Écrire vos premières règles
                </p>
              </div>
              <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-pill bg-text text-bg">
                ↗
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section
        id="comment-ca-marche"
        className="mx-auto flex w-full max-w-[1320px] flex-col gap-10 px-6 pt-16"
      >
        <div className="flex flex-col gap-6">
          <Eyebrow>Comment ça marche</Eyebrow>
          <h2 className="max-w-[960px] text-balance font-display text-[clamp(28px,3.6vw,48px)] font-medium leading-[1.15] tracking-[-.035em] text-text">
            De l&apos;implicite à des règles acceptées par tous
            <span className="ml-3.5 inline-flex -translate-y-[.12em] align-middle">
              <span className="rounded-pill bg-mint px-3.5 py-2 font-sans text-[15px] font-semibold leading-none text-bg">
                04
              </span>
              <span className="-ml-1.5 rounded-pill border border-border-strong bg-surface-3 px-3.5 py-[7px] font-sans text-sm font-medium leading-none text-text-2">
                étapes
              </span>
            </span>
          </h2>
        </div>
        <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-6 -right-6 top-1/2 hidden border-t border-dashed border-white/[.14] lg:block"
          />
          {[
            {
              color: THEME_HEX.mint,
              step: "01",
              preview: (
                <div className="flex flex-col gap-2">
                  <div className="rounded-xs bg-text px-4 py-3 text-sm font-medium text-bg">
                    Tout de suite, en direct
                  </div>
                  <div className="rounded-xs border border-white/[.06] bg-surface-3 px-4 py-3 text-sm text-text-2">
                    Par écrit, posément
                  </div>
                </div>
              ),
              title: "Chacun remplit sa carte",
              text: "Sa façon de travailler et ses besoins, en une dizaine de questions simples.",
            },
            {
              color: THEME_HEX.bluet,
              step: "02",
              preview: (
                <div className="flex flex-col gap-3 rounded-sm border border-white/[.06] bg-surface-3 p-4">
                  <div>
                    <div className="mb-1.5 flex justify-between text-[13px]">
                      <span>Horaires souples</span>
                      <span className="font-semibold">5/6</span>
                    </div>
                    <div className="h-1.5 rounded-pill bg-white/[.08]">
                      <div className="h-1.5 w-[83%] rounded-pill bg-bluet" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1.5 flex justify-between text-[13px]">
                      <span>Réunions le matin</span>
                      <span className="font-semibold text-text-2">2/6</span>
                    </div>
                    <div className="h-1.5 rounded-pill bg-white/[.08]">
                      <div className="h-1.5 w-1/3 rounded-pill bg-[#5d6a8f]" />
                    </div>
                  </div>
                </div>
              ),
              title: "Les points communs apparaissent",
              text: "L'outil montre où vous vous rejoignez et où ça coince, sans désigner personne.",
            },
            {
              color: THEME_HEX.abricot,
              step: "03",
              preview: (
                <div className="rounded-sm border border-white/[.06] bg-surface-3 p-4">
                  <p className="text-[15px] font-medium leading-snug text-text">
                    Un désaccord se dit dans les 48 h, à la personne d&apos;abord.
                  </p>
                  <div className="mt-3.5 flex items-center gap-2.5">
                    <div className="flex">
                      <span className="h-6 w-6 rounded-pill border-2 border-surface-3 bg-abricot" />
                      <span className="-ml-2 h-6 w-6 rounded-pill border-2 border-surface-3 bg-[#d6dbd9]" />
                      <span className="-ml-2 h-6 w-6 rounded-pill border-2 border-surface-3 bg-lilas" />
                      <span className="-ml-2 h-6 w-6 rounded-pill border-2 border-surface-3 bg-bluet" />
                    </div>
                    <span className="text-xs font-medium text-text-2">5 sur 6 d&apos;accord</span>
                  </div>
                </div>
              ),
              title: "L'équipe écrit ses règles",
              text: "En atelier ou au fil de l'eau, vous rédigez ensemble des accords concrets.",
            },
            {
              color: THEME_HEX.lilas,
              step: "04",
              preview: (
                <div className="rounded-sm border border-white/[.06] bg-surface-3 p-4">
                  <div className="flex h-[70px] items-end gap-2">
                    <div className="h-[34%] flex-1 rounded-sm bg-white/[.08]" />
                    <div className="h-[46%] flex-1 rounded-sm bg-white/[.08]" />
                    <div className="h-[52%] flex-1 rounded-sm bg-lilas/40" />
                    <div className="h-[70%] flex-1 rounded-sm bg-lilas/65" />
                    <div className="h-[88%] flex-1 rounded-sm bg-lilas" />
                  </div>
                  <p className="mt-2.5 text-xs text-text-2">Ça va mieux ? · mars → juillet</p>
                </div>
              ),
              title: "On mesure si ça va mieux",
              text: "Un court point régulier pour voir si les accords tiennent, et les ajuster.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="relative flex min-h-[380px] flex-col justify-between gap-7 rounded-lg border border-white/[.07] bg-surface-2 p-6"
            >
              <div className="flex items-center gap-2.5">
                <Dot color={item.color} />
                <span className="text-sm font-semibold text-text-2">{item.step}</span>
              </div>
              {item.preview}
              <div>
                <p className="font-display text-lg font-medium leading-tight tracking-[-.02em] text-text">
                  {item.title}
                </p>
                <p className="mt-2 text-pretty text-[15px] leading-relaxed text-text-2">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Produit */}
      <section className="mx-auto w-full max-w-[1320px] px-6 pt-10">
        <div className="relative flex flex-col gap-11 overflow-hidden rounded-2xl border border-white/[.06] bg-surface-1 p-7 sm:p-12 lg:p-16">
          <HaloField
            halos={[
              { color: THEME_HEX.bluet, size: 520, top: "-220px", left: "-140px", opacity: 0.22, duration: 16 },
              { color: THEME_HEX.lilas, size: 460, bottom: "-220px", right: "-140px", opacity: 0.22, duration: 20, delay: -6 },
            ]}
          />
          <div className="relative">
            <Eyebrow>L&apos;application</Eyebrow>
          </div>
          <div className="relative -mt-5 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-[720px] text-balance font-display text-[clamp(26px,3.2vw,44px)] font-medium leading-[1.1] tracking-[-.035em] text-text">
              Une vue qui parle de l&apos;équipe, <span className="text-text-2">jamais d&apos;une personne</span>
            </h2>
            <p className="max-w-[380px] text-pretty text-base leading-relaxed text-text-2">
              Des effectifs, pas des scores. Les réponses restent anonymes dans les résultats et
              chacun voit la même chose.
            </p>
          </div>

          <div className="relative rounded-xl border border-white/10 bg-white/[.04] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_40px_80px_rgba(0,0,0,.45)] [backdrop-filter:blur(24px)_saturate(140%)]">
            <div className="flex flex-col gap-[18px] rounded-lg bg-bg p-5">
              <div className="flex flex-wrap items-center justify-between gap-3.5">
                <div className="flex flex-wrap items-center gap-3.5">
                  <Logo size={32} />
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-pill bg-text px-4 py-2 text-[13px] font-medium text-bg">
                      Tableau
                    </span>
                    <span className="rounded-pill border border-white/[.07] bg-surface-2 px-4 py-2 text-[13px] text-text-2">
                      Cartes
                    </span>
                    <span className="rounded-pill border border-white/[.07] bg-surface-2 px-4 py-2 text-[13px] text-text-2">
                      Accords
                    </span>
                    <span className="rounded-pill border border-white/[.07] bg-surface-2 px-4 py-2 text-[13px] text-text-2">
                      Atelier
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex">
                    <span className="flex h-8 w-8 items-center justify-center rounded-pill border-2 border-bg bg-[#2a2f31] text-[11px] font-semibold">
                      CL
                    </span>
                    <span className="-ml-2 flex h-8 w-8 items-center justify-center rounded-pill border-2 border-bg bg-[#2a2f31] text-[11px] font-semibold">
                      JM
                    </span>
                    <span className="-ml-2 flex h-8 w-8 items-center justify-center rounded-pill border-2 border-bg bg-[#2a2f31] text-[11px] font-semibold">
                      AT
                    </span>
                    <span className="-ml-2 flex h-8 w-8 items-center justify-center rounded-pill border-2 border-bg bg-text text-[11px] font-semibold text-bg">
                      +3
                    </span>
                  </div>
                  <span className="rounded-pill bg-mint px-4 py-2 text-[13px] font-semibold text-bg">
                    + Nouvel atelier
                  </span>
                </div>
              </div>

              <div className="px-1.5 pt-2">
                <p className="font-display text-[22px] font-medium tracking-[-.025em] text-text">
                  Bonjour Camille
                </p>
                <p className="mt-1 text-sm text-text-2">
                  Pôle client · 6 personnes · lundi 3 novembre
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  { label: "Cartes remplies", value: "6", suffix: "/6", caption: "toute l'équipe" },
                  { label: "Points communs", value: "9", caption: "sur 14 questions" },
                  { label: "À discuter", value: "3", caption: "prochain atelier jeudi", ring: true },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="relative rounded-md border border-white/[.07] bg-surface-2 p-[18px]"
                  >
                    <span className="absolute right-3.5 top-3.5 flex h-[30px] w-[30px] items-center justify-center rounded-pill border border-white/[.12] text-[13px] text-text-2">
                      ↗
                    </span>
                    <p className="text-[13px] text-text-2">{stat.label}</p>
                    <p className="mt-2.5 font-display text-[32px] font-medium tracking-[-.03em] text-text">
                      {stat.value}
                      {stat.suffix && (
                        <span className="text-xl text-text-3">{stat.suffix}</span>
                      )}
                    </p>
                    <p className="text-xs text-text-3">{stat.caption}</p>
                    {stat.ring && (
                      <span className="absolute bottom-3 right-3 flex h-[34px] w-[34px] items-center justify-center rounded-pill border border-white/[.18] bg-white/[.08] [backdrop-filter:blur(10px)]">
                        <span className="h-2.5 w-2.5 rounded-pill bg-white shadow-[0_0_12px_rgba(255,255,255,.9)]" />
                      </span>
                    )}
                  </div>
                ))}
                <div className="relative rounded-md bg-text p-[18px] text-bg">
                  <span className="absolute right-3.5 top-3.5 flex h-[30px] w-[30px] items-center justify-center rounded-pill bg-bg text-[13px] text-text">
                    ↗
                  </span>
                  <p className="text-[13px] text-[#4c5552]">Accords actifs</p>
                  <p className="mt-2.5 font-display text-[32px] font-medium tracking-[-.03em]">4</p>
                  <p className="text-xs text-[#4c5552]">revue dans 6 semaines</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div className="rounded-md border border-white/[.07] bg-surface-2 p-[22px]">
                  <p className="mb-[18px] text-[17px] font-semibold text-text">Par thème</p>
                  <div className="flex flex-col gap-3.5">
                    {[
                      { label: "Rythmes", pct: 78, value: "3/4", color: THEME_HEX.bluet },
                      { label: "Communication", pct: 90, value: "3/3", color: THEME_HEX.mint },
                      { label: "Feedback", pct: 40, value: "1/3", color: THEME_HEX.abricot },
                      { label: "Décision", pct: 62, value: "2/3", color: THEME_HEX.lilas },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="grid grid-cols-[120px_minmax(0,1fr)_34px] items-center gap-3 text-[13px] text-[#d6dbd9]"
                      >
                        <span>{row.label}</span>
                        <div className="h-1.5 rounded-pill bg-white/[.08]">
                          <div
                            className="h-1.5 rounded-pill"
                            style={{ width: `${row.pct}%`, background: row.color }}
                          />
                        </div>
                        <span className="text-right font-semibold">{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-[18px] text-xs text-text-3">
                    Points communs par thème · réponses anonymes
                  </p>
                </div>
                <div className="rounded-md border border-white/[.07] bg-surface-2 p-[22px]">
                  <div className="mb-3.5 flex items-center justify-between">
                    <p className="text-[17px] font-semibold text-text">Nos accords</p>
                    <span className="text-[13px] text-text-2">Tout voir</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { text: "Pas de message urgent après 19 h", date: "mars", color: THEME_HEX.mint },
                      { text: "Réunions regroupées le mardi et le jeudi", date: "avril", color: THEME_HEX.bluet },
                      { text: "Un désaccord se dit dans les 48 h", date: "mai", color: THEME_HEX.abricot },
                    ].map((accord) => (
                      <div
                        key={accord.text}
                        className="flex items-center gap-3 rounded-sm bg-surface-3 p-3"
                      >
                        <Dot color={accord.color} />
                        <span className="flex-1 text-sm text-text">{accord.text}</span>
                        <span className="text-xs text-text-3">{accord.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* La confiance */}
      <section id="confiance" className="mx-auto flex w-full max-w-[1320px] flex-col gap-8 px-6 pt-20">
        <div className="flex flex-col gap-6">
          <Eyebrow>La confiance</Eyebrow>
          <h2 className="max-w-[900px] text-balance font-display text-[clamp(26px,3.2vw,44px)] font-medium leading-[1.15] tracking-[-.035em] text-text">
            Pour que chacun réponde sincèrement
            <span className="ml-3.5 inline-flex -translate-y-[.12em] align-middle">
              <span className="rounded-pill bg-mint px-3.5 py-2 font-sans text-[15px] font-semibold leading-none text-bg">
                02
              </span>
              <span className="-ml-1.5 rounded-pill border border-border-strong bg-surface-3 px-3.5 py-[7px] font-sans text-sm font-medium leading-none text-text-2">
                principes
              </span>
            </span>
          </h2>
        </div>
        <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <HaloField
            halos={[
              { color: THEME_HEX.lilas, size: 380, top: "10%", right: "10%", opacity: 0.2, duration: 20, delay: -6 },
              { color: THEME_HEX.bluet, size: 320, bottom: "-60px", left: "40%", opacity: 0.16, duration: 16, delay: -3 },
            ]}
          />
          <div
            className="relative flex min-h-[280px] flex-col justify-between gap-[18px] overflow-hidden rounded-lg border border-white/[.07] bg-surface-1 p-6"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,.11) 1px, transparent 1.2px)",
              backgroundSize: "16px 16px",
            }}
          >
            <p className="text-label uppercase text-text-2">Évaluation</p>
            <div>
              <p className="font-display text-[88px] font-normal leading-none tracking-[-.05em] text-text">
                0
              </p>
              <p className="mt-3 text-pretty text-[15px] leading-relaxed text-text-2">
                note individuelle. S&apos;accorder décrit des façons de travailler, il n&apos;évalue
                personne.
              </p>
            </div>
          </div>

          <div className="relative flex min-h-[280px] flex-col justify-between gap-[18px] rounded-lg border border-white/[.07] bg-surface-2 p-6">
            <p className="text-label uppercase text-text-2">Activité de l&apos;équipe</p>
            <div className="flex flex-col gap-2">
              {[
                { title: "Carte remplie", sub: "Pôle client · il y a 2 h", offset: 0 },
                { title: "Accord proposé", sub: "Feedback · hier", offset: -18 },
                { title: "Atelier planifié", sub: "Jeudi · 10 h", offset: 0 },
              ].map((item) => (
                <div key={item.title} style={{ marginLeft: item.offset, marginRight: item.offset ? 18 : 0 }}>
                  <div className="flex items-start justify-between gap-2.5 rounded-sm border border-white/10 bg-white/5 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_24px_48px_rgba(0,0,0,.35)] [backdrop-filter:blur(24px)_saturate(140%)]">
                    <div>
                      <p className="text-[15px] font-medium text-text">{item.title}</p>
                      <p className="mt-0.5 text-xs text-text-3">{item.sub}</p>
                    </div>
                    <span className="text-sm text-text-2">↗</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative flex min-h-[280px] flex-col items-center justify-center gap-[18px] overflow-hidden rounded-lg border border-white/[.07] bg-surface-1 p-6"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,.11) 1px, transparent 1.2px)",
              backgroundSize: "16px 16px",
            }}
          >
            <div className="w-full max-w-[300px] rounded-md border border-white/10 bg-surface-2/[.82] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_24px_48px_rgba(0,0,0,.35)] [backdrop-filter:blur(24px)_saturate(140%)]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-3">Lien d&apos;invitation</span>
                <span className="text-sm text-text-2">⧉</span>
              </div>
              <p className="mt-3.5 break-all font-display text-[15px] font-normal text-text">
                saccorder.fr/j/pole-client
              </p>
              <div className="mt-4 flex items-center gap-2 border-t border-dashed border-white/[.12] pt-3.5">
                <Dot color={THEME_HEX.mint} size={7} />
                <span className="text-[13px] text-mint">Ouvert jusqu&apos;au 14 nov.</span>
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[280px] flex-col justify-between gap-[18px] rounded-lg border border-white/[.07] bg-surface-2 p-6">
            <p className="text-label uppercase text-text-2">Anonymat</p>
            <div>
              <p className="text-[19px] font-medium leading-snug tracking-[-.015em] text-text">
                Anonyme dans les résultats
              </p>
              <p className="mt-2.5 text-pretty text-[15px] leading-relaxed text-text-2">
                Personne, manager compris, ne voit les réponses d&apos;une personne seule.
              </p>
            </div>
            <span className="absolute right-[22px] top-[22px] flex h-[34px] w-[34px] items-center justify-center rounded-pill border border-white/[.18] bg-white/[.08] [backdrop-filter:blur(10px)]">
              <span className="h-2.5 w-2.5 rounded-pill bg-white shadow-[0_0_12px_rgba(255,255,255,.9)]" />
            </span>
          </div>

          <div
            className="relative flex min-h-[280px] flex-col justify-between gap-[18px] overflow-hidden rounded-lg border border-white/[.07] bg-surface-1 p-6"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,.11) 1px, transparent 1.2px)",
              backgroundSize: "16px 16px",
            }}
          >
            <p className="text-label uppercase text-text-2">Simplicité</p>
            <div>
              <p className="font-display text-[88px] font-normal leading-none tracking-[-.05em] text-text">
                10
              </p>
              <p className="mt-3 text-pretty text-[15px] leading-relaxed text-text-2">
                questions simples pour remplir sa carte, sans jargon RH.
              </p>
            </div>
          </div>

          <div className="relative flex min-h-[280px] flex-col justify-between gap-[18px] rounded-lg border border-white/[.07] bg-surface-2 p-6">
            <div className="flex items-center justify-between">
              <p className="text-label uppercase text-text-2">Décision</p>
              <span className="flex gap-1.5">
                <span className="h-1 w-[18px] rounded-pill bg-mint" />
                <span className="h-1 w-2.5 rounded-pill bg-white/[.18]" />
                <span className="h-1 w-2.5 rounded-pill bg-white/[.18]" />
              </span>
            </div>
            <div>
              <p className="text-[19px] font-medium leading-snug tracking-[-.015em] text-text">
                Vos règles, écrites par vous
              </p>
              <p className="mt-2.5 text-pretty text-[15px] leading-relaxed text-text-2">
                L&apos;outil propose, l&apos;équipe décide. Chaque accord peut être revu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fin */}
      <section className="mx-auto w-full max-w-[1320px] px-6">
        <div className="flex flex-col items-center gap-7 rounded-2xl border border-white/[.06] bg-[#08090a] px-6 pb-7 pt-10 text-center sm:px-14 sm:pt-20">
          <p className="max-w-[680px] text-balance font-display text-[clamp(21px,2.4vw,30px)] font-normal leading-[1.3] tracking-[-.02em] text-text">
            Prêt à trouver la fréquence commune de votre équipe ?
          </p>
          <PrimaryCTA className="py-[7px] pr-[26px] text-base font-semibold">
            Créer la carte de mon équipe
          </PrimaryCTA>
          <p className="text-sm text-text-2">Gratuit jusqu&apos;à 6 personnes · sans carte bancaire</p>
          <div className="mt-2.5 flex gap-3">
            {[THEME_HEX.mint, THEME_HEX.bluet, THEME_HEX.abricot, THEME_HEX.lilas, THEME_HEX.ble].map(
              (color, index) => (
                <span
                  key={color}
                  className="h-2 w-2 rounded-pill"
                  style={{
                    background: color,
                    boxShadow: `0 0 12px ${color}`,
                    animation: `sa-pulse 2.6s ease-in-out ${index * 0.26}s infinite`,
                  }}
                />
              ),
            )}
          </div>
          <div className="relative inline-block">
            <div
              aria-hidden
              className="absolute inset-0 whitespace-nowrap pb-[.08em] font-logo text-[clamp(84px,17vw,250px)] font-semibold leading-[.9] tracking-[-.06em] text-lilas"
              style={{ filter: "blur(52px)", animation: "sa-glow 6s ease-in-out infinite" }}
            >
              s&apos;accorder
            </div>
            <div
              className="relative whitespace-nowrap bg-clip-text pb-[.08em] font-logo text-[clamp(84px,17vw,250px)] font-semibold leading-[.9] tracking-[-.06em] text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #ffffff 0%, #e4e6f4 18%, #c0b0e8 36%, #8fa9e8 50%, #58e8a8 64%, #2c3533 84%, #141718 100%)",
                backgroundSize: "100% 260%",
                animation: "sa-flow 9s ease-in-out infinite alternate",
              }}
            >
              s&apos;accorder
            </div>
          </div>
          <div className="flex w-full flex-wrap items-center justify-between gap-4 border-t border-white/[.08] pt-[22px] text-[13px] text-text-3">
            <span>© 2026 S&apos;accorder</span>
            <div className="flex flex-wrap gap-[22px]">
              <span>Confidentialité</span>
              <span>Mentions légales</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
